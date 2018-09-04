const ar = require('./ar');
const database = require('./data');
var couldntSend = [];
module.exports = function (bot, post, channels, i, list) {

    console.log(channels);
    function sendWithDelay(channels) {
        if (i < 0){
         // console.log("called ===============================================");
          setTimeout( function() {
            let cantSend = couldntSend.length == 0 ? "0" : couldntSend.join(" - ");
            let sended = channels.length - couldntSend.length;
            let opts = {reply_markup: {inline_keyboard: [[{text: "حذف المنشور", callback_data: `["del",${post}]`}]]}};
            bot.sendMessage(ar.get("controlGroup"), ar.get("cantSendToThis") + cantSend + ")\nتم الارسال: " + sended + "\nفشل الارسال: " + couldntSend.length, opts);
          }, 3000);
          couldntSend.length = 0; //empty the array
          return;
        } 
            sendIt(bot, post, channels, i);
        setTimeout(function () {

            
            sendWithDelay(channels);
            --i;
        }, 1000/10);
    }
    database.findPost(post, (err, realPost) => {
      if (err || realPost == null) {
      bot.sendMessage(ar.get("controlGroup"), ar.get(" there is no post for ") + post );
      console.log(err);
      return;
      }
      sendWithDelay(channels);
      bot.sendMessage(ar.get("controlGroup"), "جاري الارسال . . . .");
    });
      
    
function sendIt(bot, post, channels, i) {
  if ( channels[i] == undefined ) return;
                database.findPost(post, (err, realPost) => {
                if (err || realPost == null) {
                    bot.sendMessage(ar.get("controlGroup"), " there is no post for " + post );
                    console.log(err);
                    return;
                }
                console.log(realPost);
                console.log("i is ", i);
                if ("text" in realPost.head){
                  bot.sendMessage(channels[i], realPost.head.text, realPost.opts).then(msg => {
                     console.log(msg); 
                     list.addRef(msg.message_id, msg.chat.id/*username.toLowerCase()*/, realPost._id);
                     console.log('this is ref to del', list.refToDel);
                  //   bot.sendMessage(ar.get("controlGroup"), ar.get("yes send to ") + channels[i]);
                  })
                  .catch(err => {
                      //bot.sendMessage(ar.get("controlGroup"), ar.get("couldnt send to") + channels[i]);
                      //console.log(err);
                      couldntSend.push(channels[i]);
                  });
                  return;
                }
                if ("sticker" in realPost.head) {
                    bot.sendSticker(channels[i], realPost.head.sticker, realPost.opts).then(msg => {
                     console.log(msg); 
                     list.addRef(msg.message_id, msg.chat.username.toLowerCase(), realPost._id);
                     console.log('this is ref to del', list.refToDel);
                  //   bot.sendMessage(ar.get("controlGroup"), ar.get("yes send to ") + channels[i]);
                  })
                  .catch(err => {
                    //  bot.sendMessage(ar.get("controlGroup"), ar.get("couldnt send to") + channels[i]);
                     // console.log(err);
                      couldntSend.push(channels[i]);
                  });
                    return;
                }
                if ( "photo" in realPost.head ) {
                  console.log(realPost.head.photo);
                    bot.sendPhoto(channels[i], realPost.head.photo, realPost.opts).then(msg => {
                     console.log(msg); 
                     list.addRef(msg.message_id, msg.chat.username.toLowerCase(), realPost._id);
                     console.log('this is ref to del', list.refToDel);
                  //   bot.sendMessage(ar.get("controlGroup"), ar.get("yes send to ") + channels[i]);
                  })
                  .catch(err => {
                    //  bot.sendMessage(ar.get("controlGroup"), ar.get("couldnt send to") + channels[i]);
                     // console.log(err);
                      couldntSend.push(channels[i]);
                  });
                    return;
                }
                if ( "doc" in realPost.head ) {
                    bot.sendDocument(channels[i], realPost.head.doc, realPost.opts).then(msg => {
                     console.log(msg); 
                     list.addRef(msg.message_id, msg.chat.username.toLowerCase(), realPost._id);
                     console.log('this is ref to del', list.refToDel);
                  //   bot.sendMessage(ar.get("controlGroup"), ar.get("yes send to ") + channels[i]);
                  })
                  .catch(err => {
                  //    bot.sendMessage(ar.get("controlGroup"), ar.get("couldnt send to") + channels[i]);
                    //  console.log(err);
                      couldntSend.push(channels[i]);
                  });
                    return;
                }
                if ( "video" in realPost.head ) {
                    bot.sendVideo(channels[i], realPost.head.video, realPost.opts).then(msg => {
                     console.log(msg); 
                     list.addRef(msg.message_id, msg.chat.username.toLowerCase(), realPost._id);
                     console.log('this is ref to del', list.refToDel);
                  //   bot.sendMessage(ar.get("controlGroup"), ar.get("yes send to ") + channels[i]);
                  })
                  .catch(err => {
                  //    bot.sendMessage(ar.get("controlGroup"), ar.get("couldnt send to") + channels[i]);
                    //  console.log(err);
                      couldntSend.push(channels[i]);
                  });
                    return;
                }
                if ("voice" in realPost.head ) {
                    bot.sendVoice(channels[i], realPost.head.voice, realPost.opts).then(msg => {
                     console.log(msg); 
                     list.addRef(msg.message_id, msg.chat.username.toLowerCase(), realPost._id);
                     console.log('this is ref to del', list.refToDel);
                  //   bot.sendMessage(ar.get("controlGroup"), ar.get("yes send to ") + channels[i]);
                  })
                  .catch(err => {
                  //    bot.sendMessage(ar.get("controlGroup"), ar.get("couldnt send to") + channels[i]);
                    //  console.log(err);
                      couldntSend.push(channels[i]);
                  });
                    return;
                }
                console.log("noText");
                
            });
}
};


