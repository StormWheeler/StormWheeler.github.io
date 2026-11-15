/**
 * Altiora AI – website enquiries → Google Sheet + Telegram alert
 *
 * Lives inside the "Altiora AI – Clientele" spreadsheet (Extensions → Apps Script),
 * in the business Google account. Webflow calls this web app whenever a website form is submitted.
 *
 * Script properties (Project Settings → Script properties):
 *   TELEGRAM_TOKEN    – from @BotFather (secret, never share it)
 *   TELEGRAM_CHAT_ID  – run findTelegramChatId() once to get it
 *   WEBHOOK_KEY       – created automatically by setup()
 */

var SHEET_NAME = 'Enquiries';
var TZ = 'Asia/Dubai';
var HEADERS = ['Received (Dubai)', 'Form', 'Name', 'Email', 'Phone', 'Message', 'Consent',
               'Page', 'Status', 'Last contact', 'Notes', 'Submission ID'];
var STATUSES = ['New', 'Contacted', 'Qualified', 'Client', 'Not a fit', 'Closed'];
var RETENTION_MONTHS = 24; // Privacy notice: enquiries kept up to 24 months after last contact

/* ------------------------------------------------------------------ */
/* One-time setup                                                      */
/* ------------------------------------------------------------------ */

/** Run once: builds the Enquiries tab, creates the webhook key and the daily clean-up. */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TZ);
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME, 0);
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#0D2E20').setFontColor('#EEF0E8');
  sh.setFrozenRows(1);
  var widths = [150, 150, 160, 220, 140, 360, 80, 120, 110, 120, 260, 200];
  widths.forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  sh.getRange('F:F').setWrap(true);
  var statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build();
  sh.getRange(2, 9, sh.getMaxRows() - 1, 1).setDataValidation(statusRule);
  sh.getRange(2, 10, sh.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd');
  var blank = ss.getSheetByName('Sheet1'); if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);

  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('WEBHOOK_KEY')) props.setProperty('WEBHOOK_KEY', Utilities.getUuid().replace(/-/g, ''));

  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'purgeOldEnquiries') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('purgeOldEnquiries').timeBased().everyDays(1).atHour(3).create();
  Logger.log('Setup done. Next: add TELEGRAM_TOKEN, run findTelegramChatId(), then deploy as a web app.');
}

/** After you have messaged your bot once, run this to find your chat ID and save it. */
function findTelegramChatId() {
  var token = PropertiesService.getScriptProperties().getProperty('TELEGRAM_TOKEN');
  if (!token) throw new Error('Add the TELEGRAM_TOKEN script property first.');
  var res = JSON.parse(UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getUpdates').getContentText());
  var chats = (res.result || []).map(function (u) { var m = u.message || u.channel_post || {}; return m.chat; }).filter(Boolean);
  if (!chats.length) throw new Error('No messages found. Open your bot in Telegram, press Start (or send "hi"), then run this again.');
  var chat = chats[chats.length - 1];
  PropertiesService.getScriptProperties().setProperty('TELEGRAM_CHAT_ID', String(chat.id));
  Logger.log('Saved TELEGRAM_CHAT_ID = ' + chat.id + ' (' + (chat.title || chat.first_name || '') + ')');
  sendTelegram('Altiora AI enquiry alerts are connected. You will get a message here for each new website enquiry.');
}

/** After deploying as a web app, run this and send the logged URL to whoever connects Webflow. */
function showWebhookUrl() {
  var url = ScriptApp.getService().getUrl();
  if (!url) throw new Error('Deploy first: Deploy → New deployment → Web app.');
  Logger.log(url + '?key=' + PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY'));
}

/** Sends a fake enquiry through the whole flow (adds a TEST row you can delete). */
function sendTestEnquiry() {
  handleSubmission({
    name: 'Contact enquiry', id: 'test-' + Date.now(), submittedAt: new Date().toISOString(), publishedPath: '/contact',
    data: { Name: 'TEST – please delete', Email: 'test@example.com', Phone: '+971500000000', Message: 'This is a test enquiry.', 'Privacy consent': 'true' }
  });
}

/* ------------------------------------------------------------------ */
/* Web app                                                             */
/* ------------------------------------------------------------------ */

function doGet() { return ContentService.createTextOutput('Altiora AI enquiries endpoint is running.'); }

function doPost(e) {
  var key = PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY');
  if (!key || !e || !e.parameter || e.parameter.key !== key) return ContentService.createTextOutput('forbidden');
  try {
    var body = JSON.parse(e.postData && e.postData.contents || '{}');
    var p = body.payload || body; // Webflow v2 wraps the submission in "payload"
    if (body.triggerType && body.triggerType !== 'form_submission') return ContentService.createTextOutput('ignored');
    handleSubmission(p);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('error');
  }
}

/* ------------------------------------------------------------------ */
/* Core                                                                */
/* ------------------------------------------------------------------ */

function pick(data, names) {
  for (var i = 0; i < names.length; i++) {
    for (var k in data) if (k.toLowerCase() === names[i].toLowerCase() && data[k] !== '' && data[k] != null) return String(data[k]);
  }
  return '';
}

function handleSubmission(p) {
  var data = p.data || p.d || {};
  var id = String(p.id || p._id || '');
  var formName = p.name || p.formName || 'Website form';
  var when = p.submittedAt ? new Date(p.submittedAt) : new Date();

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) { setup(); sh = ss.getSheetByName(SHEET_NAME); }

    // Ignore repeats of the same submission (Webflow may retry a delivery)
    if (id && sh.getLastRow() > 1 && sh.getRange(2, 12, sh.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext()) return;

    var row = {
      name: pick(data, ['Name', 'name', 'Full name']),
      email: pick(data, ['Email', 'Email address', 'Work email']),
      phone: pick(data, ['Phone', 'Phone number']),
      message: pick(data, ['Message', 'What would you like to talk about?']),
      consent: pick(data, ['Privacy consent', 'Privacy-consent'])
    };
    sh.appendRow([
      Utilities.formatDate(when, TZ, 'yyyy-MM-dd HH:mm'), formName, row.name, row.email, row.phone,
      row.message, /^(true|on|yes)$/i.test(row.consent) ? 'Yes' : (row.consent || 'No'),
      p.publishedPath || '', 'New', '', '', id
    ]);
  } finally {
    lock.releaseLock();
  }

  // Summary only: the message itself stays in the spreadsheet
  var lines = ['New website enquiry · ' + formName];
  if (row.name) lines.push('Name: ' + row.name);
  if (row.email) lines.push('Email: ' + row.email);
  if (row.phone) lines.push('Phone: ' + row.phone);
  lines.push('Received: ' + Utilities.formatDate(when, TZ, 'd MMM yyyy, HH:mm') + ' (Dubai)');
  lines.push('Open the list: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
  try { sendTelegram(lines.join('\n')); } catch (err) { console.error('Telegram alert failed: ' + err); }
}

function sendTelegram(text) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TELEGRAM_TOKEN'), chat = props.getProperty('TELEGRAM_CHAT_ID');
  if (!token || !chat) { console.warn('Telegram not configured yet'); return; }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: false,
    payload: JSON.stringify({ chat_id: chat, text: text, disable_web_page_preview: true })
  });
}

/* ------------------------------------------------------------------ */
/* Retention (runs daily at 03:00 Dubai)                               */
/* ------------------------------------------------------------------ */

/** Deletes enquiries older than 24 months since last contact, except rows marked "Client". */
function purgeOldEnquiries() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sh || sh.getLastRow() < 2) return;
  var cutoff = new Date(); cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);
  var values = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    var status = values[i][8], last = values[i][9] || values[i][0];
    var d = last instanceof Date ? last : new Date(String(last).replace(' ', 'T') + ':00+04:00');
    if (status !== 'Client' && !isNaN(d) && d < cutoff) sh.deleteRow(i + 2);
  }
}
