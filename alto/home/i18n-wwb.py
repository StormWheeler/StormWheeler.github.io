"""Translations for the reworked home page sections (What we build, Labs band, Who we work with), 18 Nov 2026.
Adds the new strings to ar/ru/zh/hi/fr.json. Run from alto/."""
import json

T = {
"For your guests, and for your team.": {
  "ar": "لضيوفك، ولفريقك.",
  "ru": "Для ваших гостей и для вашей команды.",
  "zh": "服务您的宾客，也服务您的团队。",
  "hi": "आपके मेहमानों के लिए, और आपकी टीम के लिए।",
  "fr": "Pour vos clients, et pour votre équipe."},
"A narrow focus, on purpose. Each system does one job well, on the guest side of your business or the team side.": {
  "ar": "تركيز محدد عن قصد. كل نظام يؤدي مهمة واحدة بإتقان، في جانب الضيوف من عملك أو في جانب الفريق.",
  "ru": "Узкая специализация — осознанно. Каждая система хорошо делает одну задачу: на стороне гостей или на стороне команды.",
  "zh": "专注是我们的选择。每个系统只把一件事做好，要么服务宾客一侧，要么服务团队一侧。",
  "hi": "जानबूझकर सीमित फोकस। हर सिस्टम एक काम अच्छी तरह करता है, आपके व्यवसाय के मेहमानों वाले पक्ष में या टीम वाले पक्ष में।",
  "fr": "Un champ volontairement restreint. Chaque système fait bien une seule chose, côté clients ou côté équipe."},
"For your guests": {
  "ar": "لضيوفك", "ru": "Для ваших гостей", "zh": "服务您的宾客", "hi": "आपके मेहमानों के लिए", "fr": "Pour vos clients"},
"Enquiries, guest messages and bookings, answered on WhatsApp and email in Arabic and English, kept in sync with your calendar, and handed to your team when it matters.": {
  "ar": "الاستفسارات ورسائل الضيوف والحجوزات، يُرد عليها عبر واتساب والبريد الإلكتروني بالعربية والإنجليزية، وتبقى متزامنة مع تقويمك، وتُحوَّل إلى فريقك حين يلزم.",
  "ru": "Запросы, сообщения гостей и бронирования: ответы в WhatsApp и по электронной почте на арабском и английском, синхронизация с вашим календарём и передача команде, когда это важно.",
  "zh": "咨询、宾客消息和预订：通过 WhatsApp 和电子邮件以阿拉伯语和英语回复，与您的日历保持同步，并在需要时转交给您的团队。",
  "hi": "पूछताछ, मेहमानों के संदेश और बुकिंग: WhatsApp और ईमेल पर अरबी और अंग्रेज़ी में जवाब, आपके कैलेंडर के साथ तालमेल में, और ज़रूरत पड़ने पर आपकी टीम को सौंपे जाते हैं।",
  "fr": "Demandes, messages clients et réservations : réponses sur WhatsApp et par e-mail en arabe et en anglais, synchronisées avec votre agenda et transmises à votre équipe quand c'est important."},
"For your team": {
  "ar": "لفريقك", "ru": "Для вашей команды", "zh": "服务您的团队", "hi": "आपकी टीम के लिए", "fr": "Pour votre équipe"},
"Crew call times, post-event reports and routine admin. Details move between your tools instead of being retyped, and a person approves anything that matters.": {
  "ar": "مواعيد حضور فرق العمل، وتقارير ما بعد الفعاليات، والمهام الإدارية الروتينية. تنتقل التفاصيل بين أدواتك دون إعادة إدخال، ويوافق شخص على كل ما يهم.",
  "ru": "Время выхода персонала, отчёты после мероприятий и рутинная административная работа. Данные переходят между вашими инструментами без повторного ввода, а всё важное утверждает человек.",
  "zh": "工作人员到岗时间、活动后报告和日常行政事务。信息在您的工具之间自动流转，无需重复录入，凡是重要事项都由人来批准。",
  "hi": "क्रू के पहुँचने का समय, इवेंट के बाद की रिपोर्ट और रोज़मर्रा का प्रशासन। जानकारी दोबारा टाइप किए बिना आपके टूल्स के बीच जाती है, और हर ज़रूरी बात को एक व्यक्ति मंज़ूरी देता है।",
  "fr": "Horaires de convocation des équipes, rapports après événement et tâches administratives courantes. Les informations circulent entre vos outils sans ressaisie, et une personne valide tout ce qui compte."},
"We also build products of our own.": {
  "ar": "ونبني أيضًا منتجاتنا الخاصة.",
  "ru": "Мы также создаём собственные продукты.",
  "zh": "我们也在打造自己的产品。",
  "hi": "हम अपने खुद के उत्पाद भी बनाते हैं।",
  "fr": "Nous concevons aussi nos propres produits."},
"Recall, a daily app for memory and focus, and Tessera, a new guest experience for hotels.": {
  "ar": "ريكول، تطبيق يومي للذاكرة والتركيز، وتيسيرا، تجربة جديدة لضيوف الفنادق.",
  "ru": "Recall — ежедневное приложение для памяти и концентрации, и Tessera — новый опыт для гостей отелей.",
  "zh": "Recall，一款每日记忆与专注应用；Tessera，为酒店打造的全新宾客体验。",
  "hi": "Recall, याददाश्त और एकाग्रता के लिए एक दैनिक ऐप, और Tessera, होटलों के लिए मेहमानों का एक नया अनुभव।",
  "fr": "Recall, une application quotidienne pour la mémoire et la concentration, et Tessera, une nouvelle expérience client pour les hôtels."},
"See Altiora Labs": {
  "ar": "اكتشف ألتيورا لابز", "ru": "Смотреть Altiora Labs", "zh": "查看 Altiora Labs", "hi": "Altiora Labs देखें", "fr": "Découvrir Altiora Labs"},
"For your guests: a guest asks, the reply arrives in seconds, the booking is confirmed and your team is told": {
  "ar": "لضيوفك: يسأل الضيف، فيصله الرد خلال ثوانٍ، ويُؤكَّد الحجز ويُبلَّغ فريقك",
  "ru": "Для ваших гостей: гость спрашивает, ответ приходит за секунды, бронирование подтверждается, а команда получает уведомление",
  "zh": "服务您的宾客：宾客提问，几秒内收到回复，预订得到确认，团队也收到通知",
  "hi": "आपके मेहमानों के लिए: मेहमान पूछता है, कुछ ही सेकंड में जवाब आता है, बुकिंग पक्की होती है और आपकी टीम को बताया जाता है",
  "fr": "Pour vos clients : un client pose une question, la réponse arrive en quelques secondes, la réservation est confirmée et votre équipe est prévenue"},
"For your team: a request comes in, the crew is told one by one, and the report fills itself in": {
  "ar": "لفريقك: يصل طلب، فيُبلَّغ أفراد الفريق واحدًا تلو الآخر، ويكتمل التقرير تلقائيًا",
  "ru": "Для вашей команды: поступает запрос, персонал оповещается по одному, а отчёт заполняется сам",
  "zh": "服务您的团队：请求进来，工作人员逐一收到通知，报告自动填好",
  "hi": "आपकी टीम के लिए: एक अनुरोध आता है, क्रू को एक-एक करके बताया जाता है, और रिपोर्ट अपने-आप भर जाती है",
  "fr": "Pour votre équipe : une demande arrive, l'équipe est prévenue une personne après l'autre, et le rapport se remplit tout seul"},
"Altiora Labs: ideas grow inside a lab flask and rise out as new products": {
  "ar": "ألتيورا لابز: أفكار تنمو داخل دورق مختبر وتخرج منه منتجات جديدة",
  "ru": "Altiora Labs: идеи растут в лабораторной колбе и выходят из неё новыми продуктами",
  "zh": "Altiora Labs：想法在实验烧瓶中生长，化作新产品升起",
  "hi": "Altiora Labs: विचार एक प्रयोगशाला फ्लास्क में पनपते हैं और नए उत्पाद बनकर निकलते हैं",
  "fr": "Altiora Labs : des idées grandissent dans une fiole de laboratoire et en sortent sous forme de nouveaux produits"},
"Recall: tiles light up in a rising path, bottom to top": {
  "ar": "ريكول: مربعات تضيء في مسار صاعد من الأسفل إلى الأعلى",
  "ru": "Recall: плитки загораются по восходящему пути, снизу вверх",
  "zh": "Recall：方块沿上升路径自下而上依次亮起",
  "hi": "Recall: टाइलें नीचे से ऊपर की ओर बढ़ते रास्ते में जलती हैं",
  "fr": "Recall : des tuiles s'allument en suivant un chemin montant, de bas en haut"},
"Holiday homes": {
  "ar": "بيوت العطلات", "ru": "Апартаменты для отдыха", "zh": "度假屋", "hi": "हॉलिडे होम्स", "fr": "Locations de vacances"},
"Venues": {
  "ar": "المنشآت", "ru": "Площадки", "zh": "场地", "hi": "वेन्यू", "fr": "Lieux de réception"},
"Event teams": {
  "ar": "فرق الفعاليات", "ru": "Команды мероприятий", "zh": "活动团队", "hi": "इवेंट टीमें", "fr": "Équipes événementielles"},
"Guest questions, requests and arrival details handled day and night, with the front desk in control.": {
  "ar": "أسئلة الضيوف وطلباتهم وتفاصيل وصولهم تُدار ليلًا ونهارًا، مع بقاء مكتب الاستقبال صاحب القرار.",
  "ru": "Вопросы гостей, просьбы и детали заезда обрабатываются днём и ночью, а стойка регистрации всё контролирует.",
  "zh": "宾客问题、需求和抵达信息全天候处理，前台始终掌握主动。",
  "hi": "मेहमानों के सवाल, अनुरोध और आगमन की जानकारी दिन-रात संभाली जाती है, और नियंत्रण फ्रंट डेस्क के पास रहता है।",
  "fr": "Questions, demandes et informations d'arrivée des clients traitées jour et nuit, sous le contrôle de la réception."},
"Enquiries, bookings and check-in details across every property, without a round-the-clock inbox.": {
  "ar": "الاستفسارات والحجوزات وتفاصيل تسجيل الوصول لكل العقارات، دون صندوق وارد يحتاج إلى متابعة على مدار الساعة.",
  "ru": "Запросы, бронирования и детали заселения по всем объектам — без круглосуточного почтового ящика.",
  "zh": "覆盖所有房源的咨询、预订和入住信息，无需全天候盯着收件箱。",
  "hi": "हर प्रॉपर्टी की पूछताछ, बुकिंग और चेक-इन की जानकारी, बिना चौबीसों घंटे इनबॉक्स संभाले।",
  "fr": "Demandes, réservations et informations d'arrivée pour chaque logement, sans boîte de réception à surveiller jour et nuit."},
"Booking enquiries, quotes and event details kept together, from the first message to the day itself.": {
  "ar": "استفسارات الحجز وعروض الأسعار وتفاصيل الفعالية في مكان واحد، من أول رسالة حتى يوم الفعالية.",
  "ru": "Запросы на бронирование, сметы и детали мероприятия в одном месте — от первого сообщения до самого дня события.",
  "zh": "预订咨询、报价和活动细节集中管理，从第一条消息到活动当天。",
  "hi": "बुकिंग पूछताछ, कोटेशन और इवेंट की जानकारी एक साथ, पहले संदेश से लेकर इवेंट के दिन तक।",
  "fr": "Demandes de réservation, devis et détails de l'événement réunis, du premier message jusqu'au jour J."},
"Call times, last-minute changes and post-event numbers, sent and gathered on WhatsApp.": {
  "ar": "مواعيد الحضور والتغييرات في اللحظة الأخيرة وأرقام ما بعد الفعالية، تُرسَل وتُجمَع عبر واتساب.",
  "ru": "Время выхода, изменения в последний момент и итоговые цифры после мероприятия — отправка и сбор в WhatsApp.",
  "zh": "到岗时间、临时变更和活动后数据，都通过 WhatsApp 发送和收集。",
  "hi": "पहुँचने का समय, आख़िरी पल के बदलाव और इवेंट के बाद के आँकड़े, WhatsApp पर भेजे और जुटाए जाते हैं।",
  "fr": "Horaires de convocation, changements de dernière minute et chiffres après l'événement, envoyés et collectés sur WhatsApp."},
"Hotels icon": {"ar": "أيقونة الفنادق", "ru": "Значок «Отели»", "zh": "酒店图标", "hi": "होटल आइकन", "fr": "Icône Hôtels"},
"Holiday homes icon": {"ar": "أيقونة بيوت العطلات", "ru": "Значок «Апартаменты для отдыха»", "zh": "度假屋图标", "hi": "हॉलिडे होम्स आइकन", "fr": "Icône Locations de vacances"},
"Venues icon": {"ar": "أيقونة المنشآت", "ru": "Значок «Площадки»", "zh": "场地图标", "hi": "वेन्यू आइकन", "fr": "Icône Lieux de réception"},
"Event teams icon": {"ar": "أيقونة فرق الفعاليات", "ru": "Значок «Команды мероприятий»", "zh": "活动团队图标", "hi": "इवेंट टीमें आइकन", "fr": "Icône Équipes événementielles"},
}

if __name__ == '__main__':
    for l in ['ar', 'ru', 'zh', 'hi', 'fr']:
        d = json.load(open(f'{l}.json'))
        for k, v in T.items():
            d[k] = v[l]
        json.dump(d, open(f'{l}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
        print(l, len(d))
