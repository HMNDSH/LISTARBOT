#!/usr/bin/env nodejs

/*Go To Admin.js Paste Id Group*/
const TOKEN = "HERE PASTE TOKEN";// TOKEN BOT 
const adminGroup = "ID GROUP MANGER";//ADD THIS BOT (@CHANNELIDBOT) TO GET THE ID GROUP
const botUsername = "@USERNAME";// USERNAME BOT

const ar = require('./ar');
ar.set("controlGroup", adminGroup);
ar.set("botUsername", botUsername);


const TelegramBot = require('node-telegram-bot-api');
const database = require('./data');
const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);

if ( bot.token == TOKEN ) {
  console.log('yes it is');
  require('./groupBot.js')(bot);
  require('./admin.js')(bot);
}
// Just to ping!


var waitingForNewPost = {};
//var waitingForHead = {};
var waitingForBtns = {};
//var completePost   = {};
//console.log(waitingForHead);

(function () {
  bot.sendMessage( adminGroup, "/addall ch  رسست ارجع ضيف قنوات -.-");
})();

bot.onText(/^\/start$/,msg => {
  if ( msg.chat.id < 1 ) return;
  var chatId = msg.chat.id;
  var ids = msg.from.id;
    var firstName = msg.from.first_name;
    let opt = { parse_mode: "HTML", reply_markup: { inline_keyboard: [[{text: ar.get("about"), url: "https://telegram.me/hmndsh18bot"}],[{text: ar.get("howToUseIt"), url: "https://telegram.me/nona_iq_96"}],[{text: ar.get("newpost"), callback_data: "newpost"}]]}};
      bot.sendMessage(msg.chat.id, `👋|مرحباً بك ، <a href="tg://user?id=${ids}">${firstName}</a>\n• بوت نشر وحذف وصنع انلاين + ماركداون ،🔱 \n• لمعرفه كيف الاستخدام ارسل امر {/help}`, opt);
  var user = {
  _id: chatId,
  firstName,};
  database.addUser(user);
  });
  bot.on('message', msg =>{
    if ( msg.chat.id < 1 ) return;
    var chatId = msg.chat.id;
    var firstName = msg.from.first_name;
    var user = {
      _id: chatId,
      firstName,};
      database.addUser(user);
  });
bot.onText(/^\/help$/,msg => {
  if ( msg.chat.id < 1 ) return;
  let opt = {parse_mode: "HTML"};
  bot.sendMessage(msg.chat.id, ar.get('help1'),  opt );
 // bot.sendMessage(msg.chat.id, ar.get('start'), {parse_mode: "Markdown", reply_markup:{ inline_keyboard: [[{text: ar.get('newpost'), callback_data: 'newpost'}], [{text: ar.get('howToUseBtn'), callback_data: "howToUseBtn"}]]}});
});
bot.on('message', msg => {
  if ( msg.chat.id < 1 ) return;
//   bot.forwardMessage(-1001129934029, msg.chat.id, msg.message_id);
  var userId = msg.from.id;
  var chatId = msg.chat.id;
// console.log(JSON.stringify(msg) );

  // if (msg.text && msg.text.match(/^\/show(.+)/)){
  //   var text = msg.text;
  //   var id = text.replace("/show", "").trim();
  //   console.log(id);
    
  //   database.findPost(id, (err, result)=>{
  //     if ( err ){
  //       console.log(err);
  //       bot.sendMessage(chatId, ar.get('wrongId'));
  //       return;
  //     }
  //     bot.sendMessage(chatId, result.head.text, result.opts);
  //   });
  // }
//  console.log(waitingForHead.length);

function action(err, result) {
  if ( err ) {
    console.log(err);
    return;
  }
  console.log(result);
  let opt = { parse_mode: "HTML", reply_markup: { inline_keyboard: [[{text: ar.get("newpost"), callback_data: "newpost"}]]}};
  bot.sendMessage(chatId, "<code>" + ar.get('botUsername') + " "+ result._id + "</code>", opt );
}
console.log(waitingForNewPost);
if (msg.text && msg.text == "/newpost"){
  bot.sendMessage(chatId, ar.get('sendHead'));
  delete waitingForBtns[userId];
  if ( userId in waitingForNewPost ) return;
  waitingForNewPost[userId] = true;
  return;
}

if ( userId in waitingForNewPost ){

          switch(true){

            case !!msg.text:
              var text = msg.text;
              waitingForBtns[userId] = { text };
//                database.addPost(userId, { text }, action);
                var opts = {parse_mode: "HTML", reply_markup: {inline_keyboard: [[{text: ar.get('yesBtns'), callback_data: "yesBtns"}, {text: ar.get('noBtns'), callback_data: "noBtns"}]]}};
                bot.sendMessage(chatId, ar.get('headSaved'), opts);
                console.log(waitingForBtns);
                delete waitingForNewPost[userId];
            break;

            case !!msg.sticker:
            var file_id = msg.sticker.file_id;
            waitingForBtns[userId] = { sticker: file_id };
//            database.addPost(userId, { sticker: file_id }, action);
            var opts = {parse_mode: "HTML", reply_markup: {inline_keyboard: [[{text: ar.get('yesBtns'), callback_data: "yesBtns"}, {text: ar.get('noBtns'), callback_data: "noBtns"}]]}};
            bot.sendMessage(chatId, ar.get('headSaved'), opts);
                console.log(waitingForBtns);
                delete waitingForNewPost[userId];
            break;

            case !!msg.photo:
            var index   = msg.photo.length - 1;
            var file_id = msg.photo[index].file_id;
            var caption = msg.caption? msg.caption : null;
            waitingForBtns[userId] = { photo: file_id, caption };
//            database.addPost(userId, { photo: file_id }, action);
            var opts = {parse_mode: "HTML", reply_markup: {inline_keyboard: [[{text: ar.get('yesBtns'), callback_data: "yesBtns"}, {text: ar.get('noBtns'), callback_data: "noBtns"}]]}};
            bot.sendMessage(chatId, ar.get('headSaved'), opts);
                console.log(waitingForBtns);
                delete waitingForNewPost[userId];
            break;

            case !!msg.video:
            var file_id = msg.video.file_id;
            var caption = msg.caption? msg.caption : null;
            waitingForBtns[userId] = { video: file_id, caption }
//            database.addPost(userId, { video: file_id }, action);
            var opts = {parse_mode: "HTML", reply_markup: {inline_keyboard: [[{text: ar.get('yesBtns'), callback_data: "yesBtns"}, {text: ar.get('noBtns'), callback_data: "noBtns"}]]}};
            bot.sendMessage(chatId, ar.get('headSaved'), opts);
                console.log(waitingForBtns);
                delete waitingForNewPost[userId];
            break;

            case !!msg.voice:
            var file_id = msg.voice.file_id;
            var caption = msg.caption? msg.caption : null;
            waitingForBtns[userId] = { voice: file_id, caption };

            var opts = {parse_mode: "HTML", reply_markup: {inline_keyboard: [[{text: ar.get('yesBtns'), callback_data: "yesBtns"}, {text: ar.get('noBtns'), callback_data: "noBtns"}]]}};
            bot.sendMessage(chatId, ar.get('headSaved'), opts);
                console.log(waitingForBtns);
                delete waitingForNewPost[userId];
            break;

            case !!msg.document:
            var file_id = msg.document.file_id;
            var caption = msg.caption? msg.caption : null;
            waitingForBtns[userId] = { doc: file_id, caption };

            var opts = {parse_mode: "HTML", reply_markup: {inline_keyboard: [[{text: ar.get('yesBtns'), callback_data: "yesBtns"}, {text: ar.get('noBtns'), callback_data: "noBtns"}]]}};
            bot.sendMessage(chatId, ar.get('headSaved'), opts);
                console.log(waitingForBtns);
                delete waitingForNewPost[userId];
            break;
            
            default: 
            bot.sendMessage(chatId, ar.get('notSupported'));
            return;
          }
          
          return;
      

  }
    console.log("waitingForBtns " + JSON.stringify(waitingForBtns) );

    const conditionOfBtnsMsg = msg.text && !!msg.text.match(/=(\s+)?[-a-zA-Z0-9@:%_\+.~#?&//=]{1,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i) && userId in waitingForBtns;
    console.log('conditionOfBtnsMsg', conditionOfBtnsMsg);
    if(conditionOfBtnsMsg){
      
    

      var text = msg.text;
      if ( "text" in waitingForBtns[userId] ){
        var head = waitingForBtns[userId];
        try{
          var opts = new Post(text);
          if ( Object.keys(opts).length == 0 ){
            throw Error(':/ opts is empty fool');
          }         
        }catch(e) {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        };
        opts.parse_mode = "HTML";
        opts.disable_web_page_preview = true;
        //opts.reply_markup = {"1": "1"};
        console.log(JSON.stringify(opts));
        
        bot.sendMessage(chatId, waitingForBtns[userId].text, opts).then().catch(() => {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        });
        addToDb(userId, head, opts, action);

        return;
      }
      
      if ("sticker" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        try{
          var opts = new Post(text);
          if ( Object.keys(opts).length == 0 ){
            throw Error(':/ opts is empty fool');
          }         
        }catch(e) {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        };
        console.log(JSON.stringify(opts));
        bot.sendSticker(chatId, waitingForBtns[userId].sticker, opts).then().catch(() => {
        bot.sendMessage(chatId, "there is error in your buttons message please fix it");
        return;
        });
        addToDb(userId, head, opts, action);

        return;
      }
      
      if ( "photo" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        try{
          var opts = new Post(text);
          if ( Object.keys(opts).length == 0 ){
            throw Error(':/ opts is empty fool');
          }         
        }catch(e) {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        };
        opts.caption = head.caption;
        console.log(JSON.stringify(opts));
        bot.sendPhoto(chatId, waitingForBtns[userId].photo, opts).then().catch(() => {
        bot.sendMessage(chatId, "there is error in your buttons message please fix it");
        return;
        });
        addToDb(userId, head, opts, action);

        return;
      }
      
      if ("video" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        try{
          var opts = new Post(text);
          if ( Object.keys(opts).length == 0 ){
            throw Error(':/ opts is empty fool');
          }         
        }catch(e) {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        };
        opts.caption = head.caption;
        console.log(JSON.stringify(opts));
        bot.sendVideo(chatId, waitingForBtns[userId].video, opts).then().catch(() => {
        bot.sendMessage(chatId, "there is error in your buttons message please fix it");
        return;
        });
        addToDb(userId, head, opts, action);

        return;
      }
      
      if ( "voice" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        try{
          var opts = new Post(text);
          if ( Object.keys(opts).length == 0 ){
            throw Error(':/ opts is empty fool');
          }         
        }catch(e) {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        };
        opts.caption = head.caption;
        console.log(JSON.stringify(opts));
        bot.sendVoice(chatId, waitingForBtns[userId].voice, opts).then().catch(() => {
        bot.sendMessage(chatId, "there is error in your buttons message please fix it");
        return;
        });
        addToDb(userId, head, opts, action);

        return;
      }
      
      if ( "doc" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        try{
          var opts = new Post(text);
          if ( Object.keys(opts).length == 0 ){
            throw Error(':/ opts is empty fool');
          }         
        }catch(e) {
          bot.sendMessage(chatId, ar.get('errorInButtonsMsg'));
          return;
        };
        opts.caption = head.caption;
        console.log(JSON.stringify(opts));
        bot.sendDocument(chatId, waitingForBtns[userId].doc, opts).then().catch(() => {
        bot.sendMessage(chatId, "there is error in your buttons message please fix it");
        return;
        });
        addToDb(userId, head, opts, action, waitingForBtns[userId]);

        return;
      }
      
      

    }else{
     return;
    }
    

  
}); //on message 

function Result (title, message_text, description, reply_markup, id, type, sticker, photo, video, voice, doc, caption){
  this.type         = type;
  this.id           = id;
  this.title        = `CODE ${id}`;
  this.message_text = message_text;
  this.description  = description;
  this.reply_markup = reply_markup;
  this.parse_mode   = "HTML";
  this.disable_web_page_preview = true;
  this.sticker_file_id = sticker;
  this.photo_file_id   = photo;
  this.video_file_id   = video;
  this.voice_file_id   = voice;
  this.document_file_id= doc;
  
  if (caption !== null){
    this.caption         = caption;
  }
  
  
  this.noResult = function (q_id){
    //console.log(q_id)
      bot.answerInlineQuery(q_id, [{
        type: "article"
        ,id : "1"
        ,thumb_url: 'https://f.top4top.net/p_93122i2t0.jpeg'
        ,title: "👋🏻| مرحباً بك في بوت • نـونـهﺓ ،♡ء"
        ,message_text: '❕| الكود خطاء يرجى اعادة بحث عنه مرة اخرى'
        ,description: '❕| الان لا يوجد كود يرجى اعادة كتابة الكود'
      }]);
    }
}

bot.on('inline_query', function(msg)
{
    console.log('inline Query');
    var q_id          = msg.id;
    try {
      var q_query       = msg.query.toString();
    }catch(err){
      console.log("error in on inline query ");
      return;
    }
    
    console.log(q_query);
    var results = [];
    
    
    database.findPost(q_query.trim(), (err, post)=>{
      console.log("in findPost 351 line");
      if (err || post == null){
        console.log("in findPost 353 Err");
        console.log(err);
        var result = new Result();
        result.noResult(q_id);
        return;
      }
      console.log('this is post', post);
//      console.log('this is the post ', post);
      switch (true) {
        case !!post.head.text:
            console.log(post.opts.reply_markup);
            var opt = post.opts? JSON.parse(post.opts.reply_markup) : {};
            var result = new Result(post.head.text , post.head.text, post.head.text, opt, post._id, "article");
            console.log("this is result -==========" + JSON.stringify(result));
            results.push(result);
            bot.answerInlineQuery(q_id, results);          
          
          break;
        case !!post.head.sticker:
            var opt = post.opts? JSON.parse( post.opts.reply_markup): {parse_mode: "HTML"};
            var result = new Result(undefined , undefined, undefined, opt, post._id, "sticker", post.head.sticker);
            results.push(result);
            bot.answerInlineQuery(q_id, results);
            break;
        case !!post.head.photo:
          var opt = post.opts? JSON.parse(post.opts.reply_markup): {parse_mode: "HTML"};

          var result = new Result(undefined , undefined, undefined, opt, post._id, "photo", undefined, post.head.photo, undefined, undefined, undefined, post.head.caption);
          results.push(result);
          bot.answerInlineQuery(q_id, results);
          console.log(result);
          break;
        case !!post.head.video:
          var opt = post.opts? JSON.parse( post.opts.reply_markup): {parse_mode: "HTML"};
          var result = new Result("video" , undefined, undefined, opt, post._id, "video", undefined, undefined,post.head.video, undefined, undefined, post.head.caption);
          results.push(result);
          bot.answerInlineQuery(q_id, results);
          break;
        case !!post.head.voice:
          var opt = post.opts? JSON.parse( post.opts.reply_markup): {parse_mode: "HTML"};
          var result = new Result("voice" , undefined, undefined, opt, post._id, "voice", undefined, undefined, undefined, post.head.voice, undefined, post.head.caption);
          results.push(result);
          bot.answerInlineQuery(q_id, results);
          break;
        case !!post.head.doc:
          var opt = post.opts? JSON.parse( post.opts.reply_markup): {parse_mode: "HTML"};
          var result = new Result("document" , undefined, undefined, opt, post._id, "document", undefined, undefined, undefined, undefined, post.head.doc, post.head.caption);
          results.push(result);
          bot.answerInlineQuery(q_id, results);
          break;

        // default:
        //   // code
      }

    });
    
    
});


bot.on('callback_query', msg=>{

  var chatId      = msg.message.chat.id;
  var message_id  = msg.message.message_id;
  var data        = msg.data;
  var userId      = msg.from.id;
//  var userId      = msg.from.id;
//  var username    = msg.from.username? msg.from.username.toLowerCase() : null;

if (data == 'howToUseBtn'){
  bot.sendMessage(chatId, ar.get('howToUse'), {parse_mode: "Markdown" ,reply_markup: {inline_keyboard: [[{text: ar.get('newpost'), callback_data: 'newpost'}]]}});
  return;
}else if(data == 'newpost'){
  
  bot.sendMessage(chatId, ar.get('sendHead'));
  delete waitingForBtns[userId];
  if ( userId in waitingForNewPost ) return;
  waitingForNewPost[userId] = true;
  return;
}

function action(err, result) {
  if ( err ) {
    console.log(err);
    return;
  }
  console.log(result);
  let opt = { parse_mode: "HTML", reply_markup: { inline_keyboard: [[{text: ar.get("newpost"), callback_data: "newpost"}]]}};
  bot.sendMessage(chatId, "<code>" + ar.get('botUsername') +" "+ result._id + "</code>", opt );
}


  console.log(msg);
  if (data == "yesBtns"){
    bot.editMessageText(ar.get('sendBtns'), {chat_id: chatId, message_id});
    return;
  }
  if (data == "noBtns"){
      if (!waitingForBtns[userId]) return;
      if ("text" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        var opts = {parse_mode: "HTML", disable_web_page_preview: true};
        opts.reply_markup = {};
        bot.sendMessage(chatId, waitingForBtns[userId].text, opts);
        addToDb(userId, head, opts, action, waitingForBtns[userId]);

        return;
      }
      
       if ("sticker" in waitingForBtns[userId] ){
        var head = waitingForBtns[userId];
        bot.sendSticker(chatId, waitingForBtns[userId].sticker);

        addToDb(userId, head, undefined, action, waitingForBtns[userId]);
  //      waitingForBtns.splice(waitingForBtns.indexOf(i), 1);
        return;
      }
      
      if ("photo" in waitingForBtns[userId] ){
        var head = waitingForBtns[userId];
        console.log(head);
        var opts = {reply_markup: {inline_keyboard: [[]]}};
        if (head.caption){
          var opts = {caption: head.caption, reply_markup: {inline_keyboard: [[]]}};
        }
        bot.sendPhoto(chatId, waitingForBtns[userId].photo, opts);
        console.log("opts ================== ", opts);
        addToDb(userId, head, opts, action, waitingForBtns[userId]);
        return;
      }
      
      if ( "video" in waitingForBtns[userId] ){
        var head = waitingForBtns[userId];
        if (head.caption){
          var opts = {caption: head.caption, reply_markup: {inline_keyboard: [[]]}};
        }
        bot.sendVideo(chatId, waitingForBtns[userId].video, opts);

        addToDb(userId, head, undefined, action, waitingForBtns[userId]);
  //     waitingForBtns.splice(waitingForBtns.indexOf(i), 1);
        return;
      }
      
      if ("voice" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        if (head.caption){
          var opts = {caption: head.caption, reply_markup: {inline_keyboard: [[]]}};
        }
        bot.sendVoice(chatId, waitingForBtns[userId].voice, opts);

        addToDb(userId, head, undefined, action, waitingForBtns[userId]);
  //      waitingForBtns.splice(waitingForBtns.indexOf(i), 1);
        return;
      }
      
      if ("doc" in waitingForBtns[userId]){
        var head = waitingForBtns[userId];
        if (head.caption){
          var opts = {caption: head.caption, reply_markup: {inline_keyboard: [[]]}};
        }
        bot.sendDocument(chatId, waitingForBtns[userId].doc, opts);

        addToDb(userId, head, undefined, action, waitingForBtns[userId]);
        return;
      }
//    } for loop
  } // if data = noBtns
  


});

function Post(txt) {
  
  var rows = txt.split("\n");
  
  var rowsArr = [];
  for(let i of rows){
    
    var btns = i.split("+");
    try{
      var row = makeBtn(btns);
    }catch(err){
      console.log("error in making row");
      return;
    }
    

    rowsArr.push(row);
  }
  
  function makeBtn(row) {
    var fullBtns = [];
    for ( let i of row){
      var rowBtn = i.split("=");

      var obj = {text: rowBtn[0], url: rowBtn[1].trim()};
      fullBtns.push(obj);
    }
    return fullBtns;
  }
  
  var reply_markup = {};
  
  reply_markup.inline_keyboard = rowsArr;
  
  
  this.parse_mode               = "HTML";
  this.disable_web_page_preview = true;
  this.reply_markup             = reply_markup;
  
} //end of Post constructur


function isInWaitingForBtns(userId){
      for (let i of waitingForBtns){

        if (i[userId]){
          return true;
        }else{
          return false;
        }
      }
}

function deleteFromWaitingBtns(userId){
        
      for (let i of waitingForBtns){
        if (i[userId]){
          waitingForBtns.splice(waitingForBtns.indexOf(i), 1);
        }
      }
}

function addToDb(userId, head, opts, action, i) {
  database.addPost(userId, head, opts, action);
  delete i;
}
