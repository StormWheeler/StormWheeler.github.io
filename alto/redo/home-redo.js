/* Altiora home redesign (Nov 2026). Scroll films, personalisation, Tessera and Recall scenes, Recall mini session.
   Nothing here sends data anywhere; the visitor's choice is kept only in their own browser (localStorage "altiora-path"). */
(function () {
  if (window.__rxInit || !document.getElementById('rx-home')) return; window.__rxInit = 1;
  var CDN = 'https://cdn.prod.website-files.com/68388043b4e79ad0df690cb6/';
  var A = {
    'hf-d': ['6b03ace2b04ed58a168a663e_redo-hf-d-0', '6b03ad5234dc36a9d9f6df34_redo-hf-d-1', '6b03ad5291fee58916a42412_redo-hf-d-2', '6b03ad53353012da777ac5d0_redo-hf-d-3'],
    'hf-m': ['6b03ad53bc1d9c6c342936ed_redo-hf-m-0', '6b03ad53353012da777ac605_redo-hf-m-1', '6b03ad53353012da777ac617_redo-hf-m-2', '6b03ad9ab36f13775fe4d446_redo-hf-m-3'],
    'tf-d': ['6b03ad9a3ef7575a2bd76061_redo-tf-d-0', '6b03ad9a52495f9b0913086e_redo-tf-d-1', '6b03ad9a1cf1a4a6ac18feff_redo-tf-d-2', '6b03ad9a52495f9b0913087c_redo-tf-d-3'],
    'tf-m': ['6b03ad9a3ef7575a2bd7609e_redo-tf-m-0', '6b03addd3ef7575a2bd77db7_redo-tf-m-1', '6b03addda1e0191048c5e40e_redo-tf-m-2', '6b03addd2c2c80a0f3da5ba0_redo-tf-m-3'],
    rc: '6b03addd033f4b535ab5660a_redo-rc', poster: { home: '6b03addd353012da777afb13_redo-poster-home.jpg', tessera: '6b03addd353012da777afb26_redo-poster-tessera.jpg' }
  };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = matchMedia('(max-width:900px)');
  var small = innerWidth <= 900 || (navigator.connection && navigator.connection.saveData);
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;

  /* ---------- words that change on screen, in each language ---------- */
  var LANG = (window.__altioraLang || 'en');
  var L = {
    en: {}, // English is the source text
    ar: { morning: 'صباح الخير.', afternoon: 'مساء الخير.', evening: 'مساء الخير.', 'Start here': 'ابدأ من هنا', Change: 'تغيير',
      'Hotels and venues': 'الفنادق والقاعات', 'Event teams': 'فرق الفعاليات', 'Just me': 'لي أنا', Everything: 'كل شيء',
      'Showing what matters to hotel and venue teams first.': 'نعرض أولاً ما يهم فرق الفنادق والقاعات.', 'Showing what matters to event teams first.': 'نعرض أولاً ما يهم فرق الفعاليات.',
      'Starting with Recall, the app we make for people.': 'نبدأ بـ Recall، التطبيق الذي نصنعه للأفراد.', 'Showing everything.': 'نعرض كل شيء.',
      Waking: 'يستيقظ', Ready: 'جاهزة', Off: 'مطفأة', 'Warm, 40%': 'دافئة، 40%', Closed: 'مغلقة', Opening: 'تُفتح', Open: 'مفتوحة',
      'Mini session': 'جلسة قصيرة', 'Breathe in through your nose': 'خذ نفساً من أنفك', 'Long, slow breath out': 'زفير طويل وبطيء', Skip: 'تخطٍّ',
      'Watch · tap when the counter starts': 'Watch · اضغط عندما يبدأ العدّاد', "3 taps. Don't tap before it starts.": '3 ضغطات. لا تضغط قبل أن يبدأ.', 'Wait…': 'انتظر…', 'Too soon': 'مبكر جداً',
      'Words · memorise': 'Words · احفظ', 'Words · pick the 4 you saw': 'Words · اختر الكلمات الأربع التي رأيتها', 'Check my answers': 'تحقّق من إجاباتي', 'Session done': 'انتهت الجلسة',
      Settle: 'Settle', Done: 'تم', 'Watch, average': 'Watch، المتوسط', Words: 'Words', "That's it. Now put it down.": 'هذا كل شيء. ضع الهاتف جانباً الآن.',
      'The full app: about six minutes a day, and it adapts to you.': 'التطبيق الكامل: نحو ست دقائق يومياً، ويتكيّف معك.', 'Play again': 'العب مرة أخرى',
      'X of 3': '{n} من 3', 'X of 4': '{n} من 4', 'X of 4 chosen': 'تم اختيار {n} من 4', ms: '{n} ملّي ثانية',
      meSub: 'صُنع ليومك أنت، لا لعمل تجاري. جلسة قصيرة تتكيّف معك، ثم تطلب منك التوقف.',
      words: ['ميناء', 'فانوس', 'كمان', 'بستان', 'حصاة', 'بوصلة', 'مرج', 'إبريق', 'صقر', 'شريط', 'شمعة', 'جزيرة', 'رخام', 'شراع'] },
    ru: { morning: 'Доброе утро.', afternoon: 'Добрый день.', evening: 'Добрый вечер.', 'Start here': 'Начните здесь', Change: 'Изменить',
      'Hotels and venues': 'Отели и площадки', 'Event teams': 'Команды мероприятий', 'Just me': 'Только я', Everything: 'Всё',
      'Showing what matters to hotel and venue teams first.': 'Сначала показываем то, что важно командам отелей и площадок.', 'Showing what matters to event teams first.': 'Сначала показываем то, что важно командам мероприятий.',
      'Starting with Recall, the app we make for people.': 'Начинаем с Recall — приложения, которое мы делаем для людей.', 'Showing everything.': 'Показываем всё.',
      Waking: 'Просыпается', Ready: 'Готов', Off: 'Выкл.', 'Warm, 40%': 'Тёплый, 40%', Closed: 'Закрыты', Opening: 'Открываются', Open: 'Открыты',
      'Mini session': 'Мини-сессия', 'Breathe in through your nose': 'Вдохните через нос', 'Long, slow breath out': 'Долгий, медленный выдох', Skip: 'Пропустить',
      'Watch · tap when the counter starts': 'Watch · нажмите, когда запустится счётчик', "3 taps. Don't tap before it starts.": '3 нажатия. Не нажимайте раньше старта.', 'Wait…': 'Ждите…', 'Too soon': 'Слишком рано',
      'Words · memorise': 'Words · запомните', 'Words · pick the 4 you saw': 'Words · выберите 4 слова, которые видели', 'Check my answers': 'Проверить ответы', 'Session done': 'Сессия завершена',
      Settle: 'Settle', Done: 'Готово', 'Watch, average': 'Watch, в среднем', Words: 'Words', "That's it. Now put it down.": 'Вот и всё. Теперь отложите телефон.',
      'The full app: about six minutes a day, and it adapts to you.': 'Полное приложение: около шести минут в день, и оно подстраивается под вас.', 'Play again': 'Ещё раз',
      'X of 3': '{n} из 3', 'X of 4': '{n} из 4', 'X of 4 chosen': 'Выбрано {n} из 4', ms: '{n} мс',
      meSub: 'Для вашего дня, а не для бизнеса. Короткая сессия, которая подстраивается под вас, а потом просит остановиться.',
      words: ['гавань', 'фонарь', 'скрипка', 'сад', 'галька', 'компас', 'луг', 'чайник', 'сокол', 'лента', 'свеча', 'остров', 'мрамор', 'парус'] },
    zh: { morning: '早上好。', afternoon: '下午好。', evening: '晚上好。', 'Start here': '从这里开始', Change: '更改',
      'Hotels and venues': '酒店与场馆', 'Event teams': '活动团队', 'Just me': '我自己', Everything: '全部',
      'Showing what matters to hotel and venue teams first.': '优先展示对酒店和场馆团队重要的内容。', 'Showing what matters to event teams first.': '优先展示对活动团队重要的内容。',
      'Starting with Recall, the app we make for people.': '从 Recall 开始——我们为个人打造的应用。', 'Showing everything.': '展示全部内容。',
      Waking: '唤醒中', Ready: '已就绪', Off: '关', 'Warm, 40%': '暖光，40%', Closed: '已关闭', Opening: '正在打开', Open: '已打开',
      'Mini session': '迷你练习', 'Breathe in through your nose': '用鼻子吸气', 'Long, slow breath out': '缓慢地长呼气', Skip: '跳过',
      'Watch · tap when the counter starts': 'Watch · 计数开始时点按', "3 taps. Don't tap before it starts.": '点按 3 次。开始前不要点。', 'Wait…': '等待…', 'Too soon': '太早了',
      'Words · memorise': 'Words · 记住', 'Words · pick the 4 you saw': 'Words · 选出你看到的 4 个词', 'Check my answers': '检查答案', 'Session done': '练习完成',
      Settle: 'Settle', Done: '完成', 'Watch, average': 'Watch，平均', Words: 'Words', "That's it. Now put it down.": '就这样。现在把手机放下吧。',
      'The full app: about six minutes a day, and it adapts to you.': '完整应用：每天约六分钟，并会根据你调整。', 'Play again': '再玩一次',
      'X of 3': '第 {n}/3', 'X of 4': '第 {n}/4', 'X of 4 chosen': '已选 {n}/4', ms: '{n} 毫秒',
      meSub: '为你自己的一天而做，而不是为企业。简短的练习会根据你调整，然后提醒你停下来。',
      words: ['港口', '灯笼', '小提琴', '果园', '鹅卵石', '指南针', '草地', '茶壶', '猎鹰', '丝带', '蜡烛', '岛屿', '大理石', '船帆'] },
    hi: { morning: 'सुप्रभात।', afternoon: 'नमस्कार।', evening: 'शुभ संध्या।', 'Start here': 'यहाँ से शुरू करें', Change: 'बदलें',
      'Hotels and venues': 'होटल और वेन्यू', 'Event teams': 'इवेंट टीमें', 'Just me': 'सिर्फ़ मैं', Everything: 'सब कुछ',
      'Showing what matters to hotel and venue teams first.': 'पहले वह दिखा रहे हैं जो होटल और वेन्यू टीमों के लिए ज़रूरी है।', 'Showing what matters to event teams first.': 'पहले वह दिखा रहे हैं जो इवेंट टीमों के लिए ज़रूरी है।',
      'Starting with Recall, the app we make for people.': 'Recall से शुरुआत, वह ऐप जो हम लोगों के लिए बनाते हैं।', 'Showing everything.': 'सब कुछ दिखा रहे हैं।',
      Waking: 'जाग रहा है', Ready: 'तैयार', Off: 'बंद', 'Warm, 40%': 'गर्म, 40%', Closed: 'बंद', Opening: 'खुल रहे हैं', Open: 'खुले',
      'Mini session': 'मिनी सेशन', 'Breathe in through your nose': 'नाक से साँस लें', 'Long, slow breath out': 'लंबी, धीमी साँस छोड़ें', Skip: 'छोड़ें',
      'Watch · tap when the counter starts': 'Watch · काउंटर शुरू होते ही टैप करें', "3 taps. Don't tap before it starts.": '3 टैप। शुरू होने से पहले टैप न करें।', 'Wait…': 'रुकिए…', 'Too soon': 'बहुत जल्दी',
      'Words · memorise': 'Words · याद करें', 'Words · pick the 4 you saw': 'Words · देखे गए 4 शब्द चुनें', 'Check my answers': 'मेरे जवाब जाँचें', 'Session done': 'सेशन पूरा',
      Settle: 'Settle', Done: 'हो गया', 'Watch, average': 'Watch, औसत', Words: 'Words', "That's it. Now put it down.": 'बस इतना ही। अब फ़ोन रख दीजिए।',
      'The full app: about six minutes a day, and it adapts to you.': 'पूरा ऐप: रोज़ लगभग छह मिनट, और यह आपके अनुसार ढलता है।', 'Play again': 'फिर से खेलें',
      'X of 3': '3 में से {n}', 'X of 4': '4 में से {n}', 'X of 4 chosen': '4 में से {n} चुने गए', ms: '{n} मि.से.',
      meSub: 'आपके अपने दिन के लिए, किसी व्यवसाय के लिए नहीं। एक छोटा सेशन जो आपके अनुसार ढलता है, फिर रुकने को कहता है।',
      words: ['बंदरगाह', 'लालटेन', 'वायलिन', 'बगीचा', 'कंकड़', 'कम्पास', 'घास का मैदान', 'केतली', 'बाज़', 'रिबन', 'मोमबत्ती', 'द्वीप', 'संगमरमर', 'पाल'] },
    fr: { morning: 'Bonjour.', afternoon: 'Bon après-midi.', evening: 'Bonsoir.', 'Start here': 'Commencez ici', Change: 'Modifier',
      'Hotels and venues': 'Hôtels et lieux', 'Event teams': 'Équipes événementielles', 'Just me': 'Juste moi', Everything: 'Tout',
      'Showing what matters to hotel and venue teams first.': 'D’abord ce qui compte pour les équipes d’hôtels et de lieux.', 'Showing what matters to event teams first.': 'D’abord ce qui compte pour les équipes événementielles.',
      'Starting with Recall, the app we make for people.': 'On commence par Recall, l’app que nous faisons pour les particuliers.', 'Showing everything.': 'Tout est affiché.',
      Waking: 'Réveil', Ready: 'Prête', Off: 'Éteintes', 'Warm, 40%': 'Chaudes, 40 %', Closed: 'Fermés', Opening: 'S’ouvrent', Open: 'Ouverts',
      'Mini session': 'Mini-séance', 'Breathe in through your nose': 'Inspirez par le nez', 'Long, slow breath out': 'Expirez longuement, lentement', Skip: 'Passer',
      'Watch · tap when the counter starts': 'Watch · touchez quand le compteur démarre', "3 taps. Don't tap before it starts.": '3 touches. Ne touchez pas avant le départ.', 'Wait…': 'Attendez…', 'Too soon': 'Trop tôt',
      'Words · memorise': 'Words · mémorisez', 'Words · pick the 4 you saw': 'Words · choisissez les 4 mots vus', 'Check my answers': 'Vérifier mes réponses', 'Session done': 'Séance terminée',
      Settle: 'Settle', Done: 'Fait', 'Watch, average': 'Watch, moyenne', Words: 'Words', "That's it. Now put it down.": 'C’est tout. Posez votre téléphone.',
      'The full app: about six minutes a day, and it adapts to you.': 'L’app complète : environ six minutes par jour, et elle s’adapte à vous.', 'Play again': 'Rejouer',
      'X of 3': '{n} sur 3', 'X of 4': '{n} sur 4', 'X of 4 chosen': '{n} sur 4 choisis', ms: '{n} ms',
      meSub: 'Pour votre journée à vous, pas pour une entreprise. Une courte séance qui s’adapte à vous, puis vous dit d’arrêter.',
      words: ['port', 'lanterne', 'violon', 'verger', 'galet', 'boussole', 'prairie', 'théière', 'faucon', 'ruban', 'bougie', 'île', 'marbre', 'voile'] }
  };
  var EN_WORDS = ['harbour', 'lantern', 'violin', 'orchard', 'pebble', 'compass', 'meadow', 'teapot', 'falcon', 'ribbon', 'candle', 'island', 'marble', 'sail'];
  var D = L[LANG] || {};
  function T(s, n) {
    var key = s, out = D[key];
    if (out == null) out = ({ 'X of 3': '{n} of 3', 'X of 4': '{n} of 4', 'X of 4 chosen': '{n} of 4 chosen', ms: '{n} ms', morning: 'Good morning.', afternoon: 'Good afternoon.', evening: 'Good evening.',
      meSub: 'Made for your own day, not for a business. A short session that adapts to you, then tells you to stop.' })[key] || s;
    return n == null ? out : out.replace('{n}', n);
  }

  /* ---------- layout: sit under the sticky site menu and the personal bar ---------- */
  var nav = document.querySelector('.navbar-4, .w-nav');
  var NAVH = 0;
  function measure() {
    NAVH = nav ? nav.offsetHeight : 0; root.style.setProperty('--navh', NAVH + 'px');
    var rb = $('rx-ribbon'); root.style.setProperty('--ribh', (rb && !rb.hidden ? rb.offsetHeight : 0) + 'px');
    if (window.__rxFit) window.__rxFit();
  }
  measure(); addEventListener('resize', measure); addEventListener('load', measure);

  /* ---------- greeting from the visitor's own clock ---------- */
  var h = new Date().getHours();
  $('rx-greet').textContent = T(h < 5 ? 'evening' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening');

  /* ---------- posters show at once; frames stream in behind them ---------- */
  document.querySelectorAll('.rx-sticky[data-poster]').forEach(function (s) { s.style.backgroundImage = 'url(' + CDN + A.poster[s.getAttribute('data-poster')] + ')'; });

  function film(canvas, set, focusX, stage) {
    var ctx = canvas.getContext('2d'), N = 161, imgs = new Array(N), last = -1, started = false;
    function size() { var r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr)); last = -1; }
    function nearest(i) { for (var d = 0; d < N; d++) { var a = imgs[i - d], b = imgs[i + d]; if (a) return a; if (b) return b; } return null; }
    function cover(im, alpha) {
      var cw = canvas.width, ch = canvas.height, iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height;
      var s = Math.max(cw / iw, ch / ih), w = iw * s, hh = ih * s, x = Math.min(0, Math.max(cw - w, (cw - w) * focusX));
      ctx.globalAlpha = alpha; ctx.drawImage(im, x, (ch - hh) / 2, w, hh);
    }
    function draw(p) {
      var f = Math.max(0, Math.min(1, p)) * (N - 1), i = Math.floor(f), t = f - i, key = Math.round(f * 20);
      if (key === last) return; var a = nearest(i); if (!a) return; last = key;
      var b = nearest(Math.min(N - 1, i + 1)); cover(a, 1); if (b && b !== a && t > .02) cover(b, t); ctx.globalAlpha = 1;
    }
    function load(k) {
      if (k > 3) return;
      fetch(CDN + A[set][k] + '.json').then(function (r) { return r.json(); }).then(function (j) {
        var keys = Object.keys(j.f), left = keys.length;
        keys.forEach(function (key) {
          var im = new Image(); im.decoding = 'async';
          im.onload = function () { imgs[+key] = im; last = -1; if (--left === 0) load(k + 1); };
          im.onerror = function () { if (--left === 0) load(k + 1); };
          im.src = j.f[key];
        });
      }).catch(function () {});
    }
    function start() { if (started) return; started = true; size(); load(0); }
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) start(); }); }, { rootMargin: '150% 0px' }).observe(stage);
    addEventListener('resize', function () { if (started) size(); });
    return { draw: function (p) { if (started) draw(p); }, redraw: function () { last = -1; } };
  }
  var homeEl = $('rx-home'), tessEl = $('rx-tessera'), rcEl = $('rx-recall');
  var homeFilm = film($('rx-home-canvas'), small ? 'hf-m' : 'hf-d', .62, homeEl);
  var tessFilm = tessEl ? film($('rx-tess-canvas'), small ? 'tf-m' : 'tf-d', .5, tessEl) : null;

  /* ---------- scroll progress helpers ---------- */
  function prog(el) { var r = el.getBoundingClientRect(), span = el.offsetHeight - (innerHeight - NAVH); return span > 0 ? Math.max(0, Math.min(1, (NAVH - r.top) / span)) : 0; }
  function win(p, a, b, f) { f = f || .05; if (p < a || p > b) return 0; return Math.max(0, Math.min(1, (p - a) / f, (b - p) / f)); }
  function inView(el) { var r = el.getBoundingClientRect(); return r.bottom > -50 && r.top < innerHeight + 50; }
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var beats = [].slice.call(homeEl.querySelectorAll('.rx-beat'));
  var hs = 0, ts = 0, rs = 0;

  /* ---------- Tessera pieces ---------- */
  var tT = $('rx-ttemp'), tL = $('rx-tlights'), tC = $('rx-tcurt'), tS = $('rx-tstate'), tEnd = $('rx-tend'), tPanel = $('rx-panel'), tTitle = $('rx-ttitle'), tScrim = $('rx-scrim'), hg = $('rx-hg'), hn = $('rx-hn');
  function setTxt(el, s) { if (el && el.textContent !== s) el.textContent = s; }

  /* ---------- Recall pieces ---------- */
  var p3d = $('rx-p3d'), glare = $('rx-glare'), screenEl = $('rx-screen'), pZone = $('rx-pzone'), rcMark = $('rx-mark');
  var layers = screenEl ? [].slice.call(screenEl.children) : [], rcBeats = rcEl ? [].slice.call(rcEl.querySelectorAll('.rx-rbeat')) : [];
  var dots = rcEl ? [].slice.call(rcEl.querySelectorAll('.rx-dots span')) : [], tiles = rcEl ? [].slice.call(rcEl.querySelectorAll('.rx-tiles i')) : [];
  var rmTiles = rcMark ? [].slice.call(rcMark.querySelectorAll('.rx-tile')) : [], rmBg = $('rx-mbg');
  var SCAT = rmTiles.map(function (_, i) { return [Math.cos(i * 2.4) * (60 + i * 9), Math.sin(i * 1.7) * (50 + i * 7), (i % 2 ? 1 : -1) * (30 + i * 12)]; });
  var playing = false, cur = '', mx = 0, my = 0, still = 1, lastShift = 0, rcLoaded = false;
  function setScreen(s) {
    if (s === cur) return; cur = s;
    layers.forEach(function (l) {
      var on = l.getAttribute('data-s') === s; l.classList.toggle('on', on);
      if (l.tagName === 'VIDEO') { if (on) { if (l.dataset.src && l.src !== l.dataset.src) l.src = l.dataset.src; try { l.currentTime = 0; } catch (e) {} var pr = l.play(); if (pr && pr.catch) pr.catch(function () {}); } else l.pause(); }
    });
  }
  function screenFor(p) { return p < .18 ? 'today' : p < .36 ? 'settle' : p < .47 ? 'lane' : p < .58 ? 'watch' : p < .74 ? 'words' : p < .88 ? 'done' : 'today'; }
  function loadRc() {
    if (rcLoaded) return; rcLoaded = true;
    fetch(CDN + A.rc + '.json').then(function (r) { return r.json(); }).then(function (j) {
      rcEl.querySelectorAll('[data-rc]').forEach(function (el) {
        var src = j[el.getAttribute('data-rc')]; if (!src) return;
        if (el.tagName === 'VIDEO') fetch(src).then(function (r) { return r.blob(); }).then(function (b) { el.dataset.src = URL.createObjectURL(b); if (el.classList.contains('on')) { el.src = el.dataset.src; el.play().catch(function () {}); } });
        else el.src = src;
      });
    }).catch(function () {});
  }
  if (rcEl) new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) loadRc(); }); }, { rootMargin: '150% 0px' }).observe(rcEl);
  function fitPhone() {
    if (!rcEl) return;
    var ribh = parseFloat(getComputedStyle(root).getPropertyValue('--ribh')) || 0, navh = parseFloat(getComputedStyle(root).getPropertyValue('--navh')) || 0;
    if (!narrow.matches) {
      pZone.style.cssText = ''; rcMark.style.top = '';
      var last = $('rx-rlast'), hh = last.querySelector('.rx-inner').offsetHeight, vh = innerHeight - navh;
      var markTop = vh - vh * .09 - 96 - 18;
      lastShift = Math.max(0, Math.min(vh / 2 + hh / 2 - markTop, vh / 2 - hh / 2 - 20)); return;
    }
    lastShift = 0; if (playing) { pZone.style.cssText = ''; return; }
    var beatH = Math.max.apply(null, rcBeats.map(function (b) { return b.querySelector('.rx-inner').offsetHeight; }));
    var topY = ribh + 12, vh2 = innerHeight - navh;
    var ph = Math.max(110, Math.min(500, vh2 - 58 - 18 - beatH - topY - 14)), w = ph / 2.164;
    pZone.style.setProperty('--pw', w + 'px'); pZone.style.top = (topY + ph / 2) + 'px'; rcMark.style.top = topY + 'px';
  }
  window.__rxFit = fitPhone; setTimeout(fitPhone, 50); addEventListener('load', fitPhone);
  function markFrame(k) {
    var j = reduce ? 1 : ease(Math.max(0, Math.min(1, (k - .76) / .14)));
    rcMark.style.opacity = reduce ? 1 : Math.min(1, Math.max(0, (k - .72) / .06));
    rmBg.style.opacity = j; rmBg.style.transformOrigin = '50px 50px'; rmBg.style.transform = 'scale(' + (.6 + .4 * j) + ')';
    rmTiles.forEach(function (t, i) { var q = 1 - j, s = SCAT[i]; t.style.transformBox = 'fill-box'; t.style.transformOrigin = 'center'; t.style.transform = 'translate(' + s[0] * q + 'px,' + s[1] * q + 'px) rotate(' + s[2] * q + 'deg)'; });
  }

  /* ---------- one animation loop for the whole page ---------- */
  function frame(now) {
    if (inView(homeEl)) {
      var hp = prog(homeEl); hs += (hp - hs) * (reduce ? 1 : .14);
      homeFilm.draw(reduce ? .85 : hs);
      beats.forEach(function (b) { var o = reduce ? 1 : win(hs, +b.getAttribute('data-in'), +b.getAttribute('data-out')); b.style.opacity = o; b.style.transform = 'translateY(' + (1 - o) * 18 + 'px)'; b.style.visibility = o < .01 ? 'hidden' : 'visible'; if (reduce) b.style.position = 'relative'; });
    }
    if (tessEl && inView(tessEl)) {
      var tp = prog(tessEl); ts += (tp - ts) * (reduce ? 1 : .14); var k = reduce ? 1 : ts;
      tessFilm.draw(k);
      setTxt(tT, String(Math.round(31 - 9 * Math.min(1, Math.max(0, (k - .05) / .5)))));
      setTxt(tL, T(k > .07 ? 'Warm, 40%' : 'Off')); setTxt(tC, T(k > .62 ? 'Open' : k > .14 ? 'Opening' : 'Closed')); setTxt(tS, T(k > .7 ? 'Ready' : 'Waking'));
      tS.style.color = k > .7 ? '#7FD3A5' : '';
      var jj = Math.max(0, Math.min(1, (k - .72) / .2));
      hg.style.transform = 'translateX(' + -(1 - jj) * 60 + 'px)'; hn.style.transform = 'translateX(' + (1 - jj) * 60 + 'px)';
      var endO = reduce ? 1 : Math.min(1, Math.max(0, (k - .68) / .12));
      tEnd.style.opacity = endO; tScrim.style.opacity = reduce ? 1 : (.2 + .8 * Math.min(1, Math.max(0, (k - .3) / .3)));
      if (narrow.matches && !reduce) { tPanel.style.opacity = 1 - Math.min(1, Math.max(0, (k - .58) / .08)); tTitle.style.opacity = 1 - endO; } else { tPanel.style.opacity = ''; tTitle.style.opacity = ''; }
    }
    if (rcEl && inView(rcEl)) {
      var rp = prog(rcEl); rs += (rp - rs) * (reduce ? 1 : .12); var kk = reduce ? 1 : rs;
      var turn = ease(Math.min(1, kk / .17)), ry = 180 - 196 * turn, rx = 4;
      if (kk > .17) { var m = Math.min(1, (kk - .17) / .7); ry = -16 + 12 * Math.sin(m * Math.PI * 2.2); rx = 4 + 3 * Math.cos(m * Math.PI * 1.6); }
      var fin = ease(Math.max(0, Math.min(1, (kk - .86) / .08))); ry *= (1 - fin); rx *= (1 - fin);
      still += ((playing ? 0 : 1) - still) * .08;
      var bob = reduce ? 0 : Math.sin(now / 1000 * 1.3) * 6 * (1 - fin * .7) * still;
      if (root.dir === 'rtl') ry = -ry;
      p3d.style.transform = 'translateY(' + bob + 'px) rotateX(' + (rx + my * 5 * still) + 'deg) rotateY(' + (ry + mx * 7 * still) + 'deg) scale(' + (1 + .06 * fin) + ')';
      glare.style.backgroundPosition = (50 + (ry + mx * 7) * 1.6) + '% 0';
      if (!playing) setScreen(screenFor(kk));
      markFrame(kk);
      rcBeats.forEach(function (b) {
        var o = reduce ? (b.id === 'rx-rlast' ? 1 : 0) : win(kk, +b.getAttribute('data-in'), +b.getAttribute('data-out'), .035);
        b.style.opacity = o; b.style.visibility = o < .01 ? 'hidden' : 'visible';
        b.style.transform = narrow.matches ? 'translateY(' + (1 - o) * 14 + 'px)' : 'translateY(calc(-50% + ' + ((1 - o) * 14 - (b.id === 'rx-rlast' ? lastShift : 0)) + 'px))';
      });
      var d = kk < .36 ? 0 : kk < .58 ? 1 : kk < .74 ? 2 : kk < .88 ? 3 : 4;
      dots.forEach(function (s, i) { s.classList.toggle('on', i === d && kk > .17); });
      if (playing && kk < .84) { playing = false; rcEl.classList.remove('rx-playing'); fitPhone(); }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* gold light under the pointer, and the phone leaning toward it (desktop only) */
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    var glow = $('rx-glow');
    homeEl.addEventListener('pointermove', function (e) { var r = homeEl.querySelector('.rx-sticky').getBoundingClientRect(); glow.style.left = (e.clientX - r.left) + 'px'; glow.style.top = (e.clientY - r.top) + 'px'; });
    if (rcEl) rcEl.addEventListener('pointermove', function (e) { var r = rcEl.querySelector('.rx-sticky').getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = .5 - (e.clientY - r.top) / r.height; });
  }
  if (rcEl && !reduce) setInterval(function () { if (!inView(rcEl)) return; tiles.forEach(function (x) { x.className = ''; }); var a = Math.floor(Math.random() * 9), b = Math.floor(Math.random() * 9); if (b === a) b = (a + 4) % 9; tiles[a].className = 'g'; tiles[b].className = 'b'; }, 900);

  /* ---------- personalisation: "What brings you here?" ---------- */
  var slots = { build: document.querySelector('.section-forest'), tessera: tessEl, recall: rcEl, who: document.querySelector('.section-19') };
  var keys = ['build', 'tessera', 'recall', 'who'].filter(function (k) { return slots[k]; });
  var homes = keys.map(function (k) { var m = document.createComment('rx-slot'); slots[k].parentNode.insertBefore(m, slots[k]); return m; });
  var PATHS = {
    hotel: { tag: 'Hotels and venues', text: 'Showing what matters to hotel and venue teams first.', order: ['build', 'tessera', 'who', 'recall'], card: 0, who: [0, 1] },
    events: { tag: 'Event teams', text: 'Showing what matters to event teams first.', order: ['build', 'who', 'tessera', 'recall'], card: 1, who: [2, 3] },
    me: { tag: 'Just me', text: 'Starting with Recall, the app we make for people.', order: ['recall', 'tessera', 'build', 'who'], card: -1, who: [] },
    all: { tag: 'Everything', text: 'Showing everything.', order: ['build', 'tessera', 'recall', 'who'], card: -1, who: [] }
  };
  var ribbon = document.createElement('div'); ribbon.className = 'rx rx-ribbon'; ribbon.id = 'rx-ribbon'; ribbon.hidden = true;
  ribbon.innerHTML = '<div class="rx-wrap"><span class="rx-tag" id="rx-rtag"></span><p id="rx-rtext"></p><button id="rx-rchange"></button></div>';
  homeEl.parentNode.insertBefore(ribbon, homeEl.nextSibling);
  var cards = [].slice.call(document.querySelectorAll('.section-forest .project-link-wrapper'));
  var whoCards = [].slice.call(document.querySelectorAll('.section-19 .press-logo-container'));
  function apply(key, scroll) {
    var P = PATHS[key]; if (!P) return;
    P.order.filter(function (k) { return slots[k]; }).forEach(function (k, i) { var m = homes[i]; m.parentNode.insertBefore(slots[k], m.nextSibling); });
    document.querySelectorAll('.rx-path').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-path') === key)); });
    cards.forEach(function (c, i) { var on = i === P.card; c.classList.toggle('rx-lead', on); if (on) c.setAttribute('data-rx-start', T('Start here')); });
    whoCards.forEach(function (c, i) { var on = P.who.indexOf(i) > -1; c.classList.toggle('rx-lead', on); if (on) c.setAttribute('data-rx-start', T('Start here')); });
    var sub = $('rx-rsub'); if (sub) sub.textContent = key === 'me' ? T('meSub') : (sub.getAttribute('data-rx-orig') || sub.textContent);
    $('rx-rtag').textContent = T(P.tag); $('rx-rtext').textContent = T(P.text); $('rx-rchange').textContent = T('Change');
    ribbon.hidden = false; measure(); store.set('altiora-path', key);
    if (scroll) setTimeout(function () { var y = ribbon.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(root).getPropertyValue('--navh')) || 0); scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); }, 60);
  }
  var sub0 = $('rx-rsub'); if (sub0) setTimeout(function () { sub0.setAttribute('data-rx-orig', sub0.textContent); }, 0);
  document.querySelectorAll('[data-path]').forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-path'), true); }); });
  $('rx-rchange').addEventListener('click', function () { var navh = parseFloat(getComputedStyle(root).getPropertyValue('--navh')) || 0; var y = homeEl.getBoundingClientRect().top + scrollY - navh + (homeEl.offsetHeight - (innerHeight - navh)) * .84; scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); });
  var saved = store.get('altiora-path'); if (saved && PATHS[saved]) apply(saved, false);

  /* ---------- Recall mini session: Settle, Watch, Words (runs in the browser only) ---------- */
  if (!rcEl) return;
  var gBody = $('rx-gbody'), gFoot = $('rx-gfoot'), gStep = $('rx-gstep'), gLabel = $('rx-glabel'), segs = [].slice.call(rcEl.querySelectorAll('.rx-segs b'));
  var timers = [], raf = 0, res = {};
  function later(f, ms) { timers.push(setTimeout(f, ms)); }
  function clearAll() { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); }
  function seg(n) { segs.forEach(function (b, i) { b.style.width = i < n ? '100%' : '0'; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function btn(id, label, cls) { return '<button class="rx-tbtn' + (cls ? ' ' + cls : '') + '" id="' + id + '">' + esc(label) + '</button>'; }
  $('rx-play').addEventListener('click', function () {
    playing = true; rcEl.classList.add('rx-playing'); pZone.style.cssText = '';
    var navh = parseFloat(getComputedStyle(root).getPropertyValue('--navh')) || 0;
    var y = rcEl.getBoundingClientRect().top + scrollY - navh + (rcEl.offsetHeight - (innerHeight - navh)) * .95;
    scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    setScreen('game'); startSession();
  });
  function startSession() {
    clearAll(); res = {}; seg(0); gLabel.textContent = T('Mini session'); gStep.textContent = T('X of 3', 1);
    gBody.innerHTML = '<h4 id="rx-btext">' + esc(T('Breathe in through your nose')) + '</h4><div class="rx-breath"><i id="rx-bdot"></i></div>';
    gFoot.innerHTML = btn('rx-gskip', T('Skip'), 'dark'); $('rx-gskip').onclick = watchStart;
    var dot = $('rx-bdot'), txt = $('rx-btext');
    later(function () { dot.style.width = '92%'; }, 60);
    later(function () { txt.textContent = T('Long, slow breath out'); dot.style.transition = 'width 5s ease-in-out'; dot.style.width = '40%'; }, 4200);
    later(watchStart, 9400);
  }
  function watchStart() {
    clearAll(); seg(1); gStep.textContent = T('X of 3', 2); gLabel.textContent = T('Watch · tap when the counter starts'); res.watch = [];
    gFoot.innerHTML = '<p class="rx-small" id="rx-winfo">' + esc(T("3 taps. Don't tap before it starts.")) + '</p>'; trial();
  }
  function trial() {
    if (res.watch.length === 3) return wordsStart();
    gBody.innerHTML = '<button class="rx-wbox" id="rx-wbox">' + esc(T('Wait…')) + '</button>';
    var box = $('rx-wbox'), t0 = 0;
    box.onclick = function () {
      if (!t0) { clearAll(); box.textContent = T('Too soon'); later(trial, 900); return; }
      cancelAnimationFrame(raf); var rt = Math.round(performance.now() - t0); res.watch.push(rt);
      box.classList.remove('go'); box.textContent = T('ms', rt); box.onclick = null; $('rx-winfo').textContent = T('X of 3', res.watch.length); later(trial, 900);
    };
    later(function () { t0 = performance.now(); box.classList.add('go'); (function tick() { box.textContent = Math.round(performance.now() - t0); raf = requestAnimationFrame(tick); })(); }, 1100 + Math.random() * 1700);
  }
  function wordsStart() {
    clearAll(); seg(2); gStep.textContent = T('X of 3', 3); gLabel.textContent = T('Words · memorise'); gFoot.innerHTML = '';
    var pool = shuffle(D.words || EN_WORDS), seen = pool.slice(0, 4), extra = pool.slice(4, 8), i = 0;
    (function showW() { if (i === 4) return pick(seen, extra); gBody.innerHTML = '<p class="rx-small">' + esc(T('X of 4', i + 1)) + '</p><div class="rx-word">' + esc(seen[i]) + '</div>'; i++; later(showW, 1400); })();
  }
  function pick(seen, extra) {
    gLabel.textContent = T('Words · pick the 4 you saw'); var chosen = [];
    gBody.innerHTML = '<p class="rx-small" id="rx-gcount">' + esc(T('X of 4 chosen', 0)) + '</p><div class="rx-grid8">' + shuffle(seen.concat(extra)).map(function (w) { return '<button aria-pressed="false">' + esc(w) + '</button>'; }).join('') + '</div>';
    gFoot.innerHTML = btn('rx-gcheck', T('Check my answers')); var chk = $('rx-gcheck'); chk.disabled = true;
    [].forEach.call(gBody.querySelectorAll('.rx-grid8 button'), function (b) {
      b.onclick = function () {
        var w = b.textContent, at = chosen.indexOf(w); if (at > -1) chosen.splice(at, 1); else if (chosen.length < 4) chosen.push(w);
        b.setAttribute('aria-pressed', String(chosen.indexOf(w) > -1)); $('rx-gcount').textContent = T('X of 4 chosen', chosen.length); chk.disabled = chosen.length !== 4;
      };
    });
    chk.onclick = function () { res.words = chosen.filter(function (w) { return seen.indexOf(w) > -1; }).length; finish(); };
  }
  function finish() {
    clearAll(); seg(3); gLabel.textContent = T('Session done'); gStep.textContent = '';
    var avg = res.watch && res.watch.length ? Math.round(res.watch.reduce(function (a, b) { return a + b; }, 0) / res.watch.length) : null;
    gBody.innerHTML = '<div class="rx-res"><div><span>' + esc(T('Settle')) + '</span><b>' + esc(T('Done')) + '</b></div><div><span>' + esc(T('Watch, average')) + '</span><b>' + (avg ? esc(T('ms', avg)) : '–') + '</b></div><div><span>' + esc(T('Words')) + '</span><b>' + res.words + '/4</b></div></div><p class="rx-doneline">' + esc(T("That's it. Now put it down.")) + '</p><p class="rx-small">' + esc(T('The full app: about six minutes a day, and it adapts to you.')) + '</p>';
    gFoot.innerHTML = btn('rx-gagain', T('Play again'), 'dark'); $('rx-gagain').onclick = startSession;
  }
})();
