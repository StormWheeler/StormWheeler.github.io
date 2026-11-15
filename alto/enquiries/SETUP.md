# Website enquiries → Clientele spreadsheet + Telegram alert

What it does: every time someone sends the **Contact** or **Connect** form on altioraai.com,

1. Webflow emails you as it does now (set the address in Webflow: Site settings → Forms → *Form notification* → use hello@altioraai.com).
2. A new row appears in the **Altiora AI – Clientele** Google Sheet (in the business account), with status **New**.
3. Your phone gets a Telegram message: who, which form, email/phone, time, and a link to the sheet. The message text itself stays in the sheet only.

Everything runs inside the business Google account; no extra service sees the data except Telegram (summary only), which is listed in the Privacy notice.

---

## Part A — Telegram bot (2 minutes, on your phone)

1. In Telegram, open **@BotFather** → send `/newbot`.
2. Name: `Altiora Enquiries` · username: something unique ending in `bot`, e.g. `altiora_enquiries_bot`.
3. BotFather replies with a **token** (looks like `123456789:AA…`). Keep it private: anyone with it can post as the bot.
4. Open your new bot (BotFather gives the link) and press **Start**.

## Part B — Spreadsheet + script (business Google account, about 5 minutes)

1. Signed in as **hello@altioraai.com**, create a new Google Sheet named **Altiora AI – Clientele**.
2. **Extensions → Apps Script**. Delete what's there, paste all of `Code.gs`, click **Save**.
3. Run **`setup`** (select it in the toolbar, click ▶ Run). Approve the permission prompts (it's your own script).
   This builds the *Enquiries* tab, creates a secret webhook key, and adds a daily clean-up that deletes enquiries older than 24 months unless marked *Client* (that's what the Privacy notice promises).
4. **Project Settings (⚙) → Script properties → Add property**: `TELEGRAM_TOKEN` = the token from Part A. Save.
5. Back in the editor, run **`findTelegramChatId`**. You should get "Altiora AI enquiry alerts are connected" in Telegram.
6. **Deploy → New deployment** → type **Web app** → *Execute as*: **Me** · *Who has access*: **Anyone** → **Deploy**.
   ("Anyone" is needed so Webflow can reach it; the secret key in the URL blocks everyone else.)
7. Run **`showWebhookUrl`** and copy the URL from the log (it ends in `?key=…`).
8. Optional check: run **`sendTestEnquiry`** → a TEST row appears and Telegram pings. Delete the row.

## Part C — Connect Webflow (Claude does this)

Send the URL from step B7. Claude registers it as a Webflow *form submission* webhook and runs a live test.

---

## Using the sheet as your clientele list

- Change **Status** as you go: New → Contacted → Qualified → Client (or Not a fit / Closed).
- Update **Last contact** when you speak to someone; the 24-month clean-up counts from that date.
- Rows marked **Client** are never deleted automatically.
- Add your own columns to the right of *Submission ID* if you need them.

## If something stops working

- No Telegram alert but the row is there: check `TELEGRAM_TOKEN` / `TELEGRAM_CHAT_ID` in Script properties, run `findTelegramChatId` again.
- Nothing arrives at all: Apps Script → **Executions** shows each delivery and any error.
- After editing the code: **Deploy → Manage deployments → Edit → Version: New version**, so the same URL keeps working.
- To change the Telegram recipient (e.g. a team group): add the bot to the group, send a message there, run `findTelegramChatId`.

## WhatsApp later

When the business has a WhatsApp Business (Cloud API) account and an approved alert template, `sendTelegram` can be joined by a `sendWhatsApp` function using the same summary text.
