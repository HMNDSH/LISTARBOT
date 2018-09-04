const ar = new Map();
// ========= groupBot.js =============
ar.set("post changed", "<code>• تم تعديل القناة</code>");

ar.set("new channel added", "☑️ ");

ar.set(":/ this post is already sended.", "<code>:/ this post is already sended.</code>");

ar.set('there is no enough posts', "<code>there is no enough posts ");

ar.set("I didn't found this channel :/ ", "<code>I didn't found this channel :/ </code>");

ar.set("yes deleted", "I☑️ تم حذف القناة من اللستة بنجاح.");

ar.set('there is no such channel', '<code>there is no such channel');

ar.set('I cant reach this channel', 'I❕ هذه ليست قناة ');

ar.set('this post is already sended to all channels', '•| هذا الكود منشور حول ع الوراه يحضي 😹');

ar.set('cant delete msg from this channel', 'I❕ ليس لدي صلاحية حذف الرسالة في هذه القناة ');

ar.set('cant post message in this channel', 'I❕ ليس لدي صلاحية ارسال رسالة في هذه القناة ');

ar.set("channel allready added", "I❕ القناة موجودة بالفعل ");

ar.set("wrong postCode", 'I❕ هذا الكود لم يتم نشره في القناة. ');

ar.set("wrong channel serial number", 'I❕ تاكد من صحة رقم القناة.');

ar.set("post deleted successfully", 'I☑️ تم المسح بنجاح. ');

ar.set("couldnt delete this post", '<code>couldnt delete this post</code>');

ar.set('there is no channels in the list', 'I❕ اللستة خالية من القنوات.');

ar.set('all channels have been deleted', "I☑️ تم تصفية اللستة بنجاح.");

ar.set("sending . . .", "I📣 جاري الارسال لجميع القنوات . . .");

ar.set('deleting . . .', 'I☑️ جاري حذف المنشور من جميع القنوات . . .');

ar.set("- new channels added -", "I__القنوات الجديدة__I");

ar.set("I'm not admin in this channel", "❕ انا لست مشرف في هذه القناة ");

ar.set('send to all report', `
💡| قام بالنشر فــي : ($ok)
🕹| لم ينشر فــي : ($fail)`);

ar.set('del from all report', `
✔️| قام بالمسح مـن : ($ok)
✖️| لم يمسح مـن : ($channels)`);


ar.set('help', `‏‏•| أوامر البوتــہ 📜
═══ ═══ ═══ ═══ ═══ 
• لـ لأضافه قناه 
‎‏•| /add
• لـ لأضافه مجموعة قنوات
‎‏•| /addall
• لـ حذف قناة
‎‏•| /rem
• لـ نشر منشور
‎‏•| /send
• لـ حذف منشور
‎‏•| /del
• لـ حذف مـن قناه معينه
‎‏•| /delete
• لـ مشاهده قنوات مضافه
‎‏•| /showall
• لـ حذف جميع قنوات مضافه
‎‏•| /remall list
═══ ═══ ═══ ═══ ═══
•| اوامر اضافية للبوت
•| اضافه قناه للبوت بالتوجيه 
•| توجد دكمه لحذف منشور بدل امر والكود 
‏═══ ═══ ═══ ═══ ═══`);

ar.set('/addall@', `•| لا اضافة جماعية مره واحده
 ═══ ═══ ═══ ═══
مثل :~
<code>
/addall
@channel1
@channel2
@channel3
</code>
 ═══ ═══ ═══ ═══
•|سيقوم البوت باضافة جميع القنوات`);

ar.set('/add@', `•| لا اضافة قناه فرديه
 ═══ ═══ ═══ ═══
مثل :~
<code>/add @channel</code>
 ═══ ═══ ═══ ═══
•|سيقوم البوت باضافتها`);

ar.set('/del@', `•| لـ حذف منشور 
 ═══ ═══ ═══ ═══
مثل :~
<code>/del 11</code>
• رقم 11 هوه رقم الكود 
 ═══ ═══ ═══ ═══
•|سيقوم البوت بحذف مـن القنوات`);

ar.set('/delete@', `•| لـ حذف مـن قناه معينه 
 ═══ ═══ ═══ ═══
مثل :~
<code>/delete 11 from 1</code>
• رقم 1 هوه رقم تسلسل قناة 
• يمكنك رؤية تسلسل قنوات /showall
• ستضهر اليك بجنب قنوات رقم تسلسل
 ═══ ═══ ═══ ═══
•|سيقوم البوت بحذف مـن القنوات`);

ar.set('/send@', `•| للنشر في قنوات 
 ═══ ═══ ═══ ═══
مثل :~
<code>/send 11</code>
• رقم 11 هوه رقم الكود 
 ═══ ═══ ═══ ═══
•| سيقوم البوت بنشر في القنوات`);

ar.set('/rem@', `•| لحذف قناه فرديه
 ═══ ═══ ═══ ═══
مثل :~
<code>/rem @channel</code>
• واذا لم يوجد معرف بالقناه 
• يمكنك حذف عن طريق تسلسل قناه
مثل :~
<code>/rem 1</code>
• لرؤية تسلسل القناه 
/showall
 ═══ ═══ ═══ ═══
•|سيقوم البوت بحذفها مـن البوت`);

ar.set('/remall@', `•| لـ حذف قنوات مضافه بالبوت
 ═══ ═══ ═══ ═══
مثل :~
<code>/remall list</code>
 ═══ ═══ ═══ ═══
•|سيقوم البوت بحذف جميع قنوات المضافه`);

// =================== podcast.js ==================
ar.set(" there is no post for ", "•| هَـــاآ نعست يمعود ماكو هيج كود 😐");
ar.set("yes send to ", " yes send to ");
ar.set("couldnt send to", "couldnt send to \" \n ");
ar.set("all list deleted", "all list deleted");
ar.set("cantSendToThis", "cantSendToThis \n(");
ar.set("cantDeleteFrom", "cantDeleteFrom \n (");


// ================= from llistbot.js ===============


var start = "";

var headIs = `
راس الرسالة هو الجزء العلوي من الرسالة الذي يكون فوق قائمة الازرار

كما في الصورة التالية 
\`* يمكنك انشاء رسالة بدون ازرار (راس فقط)\``;

var howToUse = `
لانشاء رسالة مع ازرار اتبع الخطوات التالية 

➖ اضغط على انشاء رسالة جديدة.
➖ ثم ارسل راس الرسالة.
 \`راس الرسالة هو الجزء الذي يكون فوق قائمة الازرار, من الممكن ان يكون كتابة, فديو, صوت, صورة, ملف, ملصق\`

➖ الان قم بارسال كود الازرار على النحو التالي.
1- انشاء زر واحد

\`قناة كل جديد - t.me/listarbot\`

الكود اعلاه سيصنع زر يحولك الى قناة كل جديد.

2- لوضع الازرار فوق بعضها انزل سطر واكتب الكود كما في المثال التالي:

\`قناتي - t.me/listarbot
قناتي - t.me/listarbot\`

يمكنك اضافة عدد ازرار كما تشاء

3- لوضع زر بجانب زر آخر ضع علامة + بين كل زر كما في المثال: 

\`قناتي1 - t.me/listarbot   +   قناتي2 - t.me/listarbot\`

يمكنك اضافة عدد ازرار كما تشاء

4- يمكنك جمع الخطوات اعلاه في رسالة واحدة والحصول على ازرار مرتبه حسب رغبتك كما في المثال: 

\`قناة كل جديد - t.me/listarbot\`
\`قناتي1 - t.me/listarbot   +   قناتي2 - t.me/listarbot\`

بعد كتابة الكود الازرار بنجاح سأقوم بارسال شكل الرسالة النهائي مع كود الرسالة`;

ar.set('newpost', '‏‎• انشاء كود جديد 📩');
ar.set('about', '‏‎• للأستفسار ، 🖤');
ar.set('howToUseIt', ' • لستة ضهرية 10k ⚜️ ');
ar.set('howToUseBtn', 'طريقة الاستخدام');
ar.set('howToUse', howToUse);
ar.set('sendHead', `• ارسل رأس الرساله ، 📩
• من الممكن ان تكون ؛📝
- رساله نصيه ، ملصق ، صوره ، فديو ، مقطع صوتي ، ملف ، صوره بالكتابه ، صوره متحركه ، كليشه . . .⚜️`);
ar.set('whatIsHead', headIs);
//ar.set('wrongId', 'لا يوجد رسالة لهذا الكود, تاكد من صحة الكود وحاول مرة اخرى');
ar.set('errorInButtonsMsg', 'هناك خطا في تنسيق الرسالة الرجاء ارسال رسالة الازرار بالطريقة الصحيحة');
ar.set('start', '• بوت نشر وحذف وصنع انلاين + ماركداون ،🔱 \n• لمعرفه كيف الاستخدام ارسل امر {/help}');
ar.set('help1', '• <a href="http://telegra.ph/%D8%B7%D8%B1%D9%8A%D9%82%D9%87-%D8%A7%D8%B3%D8%AA%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D8%A8%D9%88%D8%AA-03-07">رابط شرح استعمال البوت</a>');
ar.set('notSupported', 'ناسف هذه الصيغة غير مدعومة حالياً');
ar.set('headSaved', '• هل تريد اضافه قوائم شفافه ؟ ❇️ ');
ar.set('yesBtns', ' • نعم ✅');
ar.set('noBtns', ' • لا ❌');
ar.set('sendBtns', '• ارسل القوائم الشفافه 📩');
ar.set("your code is ready", "تم انشاء المنشور بنجاح والكود الخاص بك هو \n");
ar.set('botUsername', '@bibot');

module.exports = ar;
