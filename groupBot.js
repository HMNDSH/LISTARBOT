const ar = require('./ar');
const database = require('./data');
//for sequential iteration
const TaskQueue = require('./taskQueue');
//message queue for sequential podcasting with delay
const messagesQueue = new TaskQueue(1); // concurrency = 1
//delete messages from channels sequentially
const deleteQueue = new TaskQueue(1);
//queue for multi add
const multiAddQueue = new TaskQueue(1);
//auto list queue
const autoListQueue = new TaskQueue(1);
//the main list object
const list = {};

//object to save channels {"channel": id, "channel2": id2}
list.channels = {};
// map to store channel info the key is channel id and the value is an array [channel username, channel title, id]
const channelMap = new Map();
// save channel with associated serial {serial -> channel}
const serialMap = new Map();
var fs = require('fs');
list.addChannel = function (bot, msg, channelUsername, fwd, callback) {
	let channel, chUsername, chTitle;
	const chatId = msg.chat.id;
	const botUsername = ar.get('botUsername').replace('@', '');

	if( fwd ) {
		channel    = msg.forward_from_chat.id;
		chUsername = msg.forward_from_chat.username? "@" + msg.forward_from_chat.username : "@";
		chTitle    = msg.forward_from_chat.title;
		add(channel);
	} else {
		bot.getChat(channelUsername).then( chat => {
			channel    = chat.id;
			chUsername = chat.username? '@'+chat.username : "@";
			chTitle	   = chat.title;
			add(channel);
		}).catch( err => {
			callback(ar.get('I cant reach this channel') + ` ${channelUsername}`);
		});
	}
	function add(channel) {
		let num = 0;
		bot.getChatAdministrators(channel).then( admins => {
			// {array} botAdmin
            const botAdmin = admins.filter(admin => admin.user.username == botUsername);
	        if (botAdmin[0].can_delete_messages == false)
	            return Promise.reject('cant delete msg from this channel');
	        if (botAdmin[0].can_post_messages == false)
	            return Promise.reject('cant post message in this channel');//bot.sendMessage(chatId, ar.get('cant post message in this channel'));
            if ( channel in list.channels )
                return Promise.reject("channel allready added");

            list.channels[channel] = ++channelMap.size;
            callback( ar.get("new channel added") + ` ${/@$/.test(chUsername) ? chTitle : chUsername}`);

fs.readFile("ch.txt", 'utf8', function(err, data) {
  console.log(data);
var m = data.match(channel);
if(!m){
fs.open('ch.txt', 'a', 666, function( e, id ) {
  fs.write( id, '\n'+channel, null, 'utf8', function(){
    fs.close(id, function(){
      console.log('file closed');
    });
  });
});
}

});




		}).then(() => {
				let serial = channelSErial.next().value.toString();
				//refrence to channel by its serial
				serialMap.set( serial, channel.toString());
		        //refrence to channel name and username by its id
		        channelMap.set(channel.toString(), [chUsername,chTitle,serial]);
	    }).catch(err => {
	        console.trace("Error: 70", err);
	    		if (err == 'cant delete msg from this channel') {
	    			return callback( ar.get(err) + ` ${chUsername} ${chTitle}`);
	    		}
	    		if (err == 'cant post message in this channel') {
	    			return callback( ar.get(err) + ` ${chUsername} ${chTitle}`);
	    		}
	    		if (err == "channel allready added") {
                    return callback( ar.get("channel allready added") + ` ${chUsername} ${chTitle}`);
                }
		        callback(ar.get("I'm not admin in this channel"));
	    });
	}
}

//refrence to delete messages from channels
list.refToDel = {};
// adding ref to delete post
list.addRef = function (message_id, channel, postCode){
    if ( this.refToDel[postCode] ){
        if(this.refToDel[postCode][channel]){
            this.refToDel[postCode][channel].push(message_id);
        }else{
            this.refToDel[postCode][channel] = [message_id];
        }
        return;
    }
    this.refToDel[postCode] = {};
    this.refToDel[postCode][channel] = [];
    var arr = this.refToDel[postCode][channel];
    arr.push(message_id);
};

list.getChannels = function (bot, chatId) {
	var text = `📮 العدد الكلي = ${channelMap.size} \n ═══════════════`;
		for (var [key, value] of channelMap) {
		  text += `\nI ${value[2]} I - ${/@$/.test(value[0])? value[1] : value[0]}`;
		}
		text += '\n ═══════════════'
	bot.sendMessage(chatId, text);
}
// deleteing channel from the list
list.deleteCh = function (channel) {
	delete this.channels[channel];
	channelMap.delete(channel.toString());
    fs.readFile("ch.txt", 'utf8', function(err, data) {

var newData = data.replace(channel+"\n","");
  console.log(data);
console.log("============");
console.log(newData);
fs.writeFile("ch.txt", newData, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("channels added");
});

});
}

list.sendToAll = function (bot, postCode , chatId ,callback) {
    database.findPost(postCode, (err, realPost) => {
        if (err || realPost == null) {
            bot.sendMessage(ar.get("controlGroup"), ar.get(" there is no post for ") + postCode);
            console.log(err);
            return;
        }
        send(bot, this, realPost, 100/3, callback);
    });
}

list.deletePost = function (bot, postCode, callback) {
    let couldntDel = [];
    if ( postCode in this.refToDel ){
    const channels = Object.keys(this.refToDel[postCode]);
    
    for (let i = channels.length; i > 0; i--){

        deleteQueue.pushTask( (done) => {
            let currentCh = channels[i - 1];

            bot.deleteMessage( currentCh, list.refToDel[postCode][currentCh][0].toString())
                .catch( () => {
                    couldntDel.push(currentCh.toString());
                })
                .then( deleted => {
                    delete list.refToDel[postCode][currentCh];
                    if ( Object.keys(list.refToDel[postCode]).length == 0 ){
                        callback(undefined, couldntDel, channels.length);
                        delete list.refToDel[postCode];
                    }
                });
                setTimeout( () => done(), 100/3 );
        });
    }
     } else {
        callback('wrong postCode');
     }
 }

list.deleteSinglePost = function (postCode, chSerial, bot, callback) {
    if ( postCode in this.refToDel ) {
        if ( serialMap.has(chSerial.toString()) ) {

            currentCh = serialMap.get(chSerial.toString());
            bot.deleteMessage( currentCh, list.refToDel[postCode][currentCh][0].toString()).catch(() => {
                callback("couldnt delete this post");
            }).then( () => {
                callback("post deleted successfully");
            })
        
        } else {
            callback("wrong channel serial number");
        }
    } else {
        callback("wrong postCode");
    }
}
module.exports = function (bot) {

// for adding channel to list by it's username
	bot.onText(/^\/add (@\w+)/, (msg, match) =>{
	    if (msg.chat.id != ar.get("controlGroup")) return;
	    list.addChannel(bot, msg, match[1], undefined, (result) => {
            bot.sendMessage(msg.chat.id, result);
        });
	});

// for adding channel to the list by forwarding a message from it
    bot.on('message', msg => {
        if ( 'forward_from_chat' in msg && msg.forward_from_chat.type === 'channel' ) {
        	if (msg.chat.id != ar.get("controlGroup")) return;
            list.addChannel(bot, msg, undefined, true, (result) => {
                bot.sendMessage(msg.chat.id, result);
            });
        }
    });
    
bot.onText(/^\/print$/,msg => {
console.log("==============");
   console.log(list);
console.log("==============");
console.log(list.channels);
console.log("==============");
});
// getting all added channels
    bot.onText(/^\/(showall)|(hi)$/, msg => {
       const chatId = msg.chat.id;
       if (chatId != ar.get("controlGroup")) return;
       
       list.getChannels(bot, chatId);
//////////////////////////////////////////
		// for (var [key, value] of serialMap) {
		//   console.log(`${key} ------------ ${value}`);
		// }
///////////////////////////////////////////
    });
//podcasting a message to all channels
bot.onText(/^(\d+)/, (msg, match) => {
    let chatId = msg.chat.id;
    let postCode =msg.text.trim();
        if (chatId != ar.get("controlGroup")) return;
        database.findPost(postCode, (err, realPost) => {
            if (err || realPost == null) {
            bot.sendMessage(ar.get("controlGroup"), ar.get(" there is no post for ") + postCode);
            //console.log(err);
            return;
            }

            if ( postCode in list.refToDel )
                return bot.sendMessage(chatId, ar.get('this post is already sended to all channels'));
            if (channelMap.size == 0)
                return bot.sendMessage(msg.chat.id, ar.get('there is no channels in the list'));
            bot.sendMessage(ar.get("controlGroup"), ar.get("sending . . .")).then(sending => {
                list.sendToAll(bot, match[1], msg.chat.id, (completed, couldntSend) => {
                bot.deleteMessage(chatId, sending.message_id);
            let x = couldntSend.map(ch => channelMap.get(ch.toString()).join(" - ")).join("\n");
            let failChannels = x.length > 2 ? '\n' + x + '\n' : x;
            let opts = {reply_markup: {inline_keyboard: [[{text: "حذف المنشور", callback_data: `["del",${match[1]}]`}]]}};
            bot.sendMessage(ar.get("controlGroup"),ar.get('send to all report').replace('$ok', completed - couldntSend.length).replace(/\$fail/gm, failChannels).replace(/\$Count/gm, couldntSend.length) , opts);
                 });
            });
        });
    });


    bot.onText(/^\/del (\d+)/, (msg, match) => {
        if (msg.chat.id != ar.get("controlGroup")) return;
    if ( !match[1] in list.refToDel )
        return bot.sendMessage(msg.chat.id, ar.get('wrong postCode'));

        bot.sendMessage(msg.chat.id, ar.get('deleting . . .')).then( deleting => {
            console.log(deleting);
            list.deletePost(bot, match[1].trim() , (err, couldntDel, i) => {
                bot.deleteMessage(msg.chat.id, deleting.message_id);
                if (err)
                    return bot.sendMessage(msg.chat.id, ar.get(err));
                try{
                    var x =couldntDel.length? '\n' + couldntDel.map(ch => channelMap.get(ch.toString()).join(" - ")).join("\n") + '\n': " ";
                }catch(e) {
                    var x = "please report this to admin 1";
                }
                bot.sendMessage(msg.chat.id, ar.get('del from all report').replace('$ok', i - couldntDel.length).replace(/\$fail/gm, couldntDel.length).replace(/\$channels/gm, x));
            });
        });
    });
//mutiadding 
    bot.onText(/^\/addall/, (msg, match) => {
        if (msg.chat.id != ar.get("controlGroup")) return;
            var s = msg.text.match("ch");
if(s){
fs.readFile("ch.txt", 'utf8', function(err, data) {
let text = data;
let channels = text.split("\n").map( ch => ch.trim()).filter( ch => /^(@)|(-)\w+$/.test(ch));
            let finishMsg = ar.get("- new channels added -");
            let i = 0;
            channels.forEach( ch => {
                multiAddQueue.pushTask( (done) => {
                    list.addChannel(bot, msg, ch, undefined, result => {
                        finishMsg += "\n" + result;

                    if ( ++i == channels.length ) {
                        bot.sendMessage(msg.chat.id ,finishMsg);
                    }
                    setTimeout( () => done(), 100/3);
                    });      
                });
            });
});
}else{
let text = msg.text.replace("/addall\n", "");
let channels = text.split("\n").map( ch => ch.trim()).filter( ch => /^(@)|(-)\w+$/.test(ch));
            let finishMsg = ar.get("- new channels added -");
            let i = 0;
            channels.forEach( ch => {
                multiAddQueue.pushTask( (done) => {
                    list.addChannel(bot, msg, ch, undefined, result => {
                        finishMsg += "\n" + result;

                    if ( ++i == channels.length ) {
                        bot.sendMessage(msg.chat.id ,finishMsg);
                    }
                    setTimeout( () => done(), 100/3);
                    });      
                });
            });
}
            
    });


// deleting channel from list
    bot.onText(/^\/rem (@\w+|\d+)/, (msg, match) => {
        if (msg.chat.id != ar.get("controlGroup")) return;
        let ch = /@/.test(match[1].trim())? match[1].trim() : serialMap.get(match[1].trim());
        bot.getChat(ch).then( chat => {
        	let channel = chat.id;
        if ( channel.toString() in list.channels ){
            list.deleteCh(channel);
            bot.sendMessage(msg.chat.id, ar.get("yes deleted") + chat.title + ' ');
        }
        else{
            bot.sendMessage(msg.chat.id, ar.get("I didn't found this channel :/ ") + channel);
        }
        }).catch(err => {
        	bot.sendMessage(msg.chat.id, ar.get("I didn't found this channel :/ ") + match[1]);
        });


    });

    bot.onText(/^\/remall list$/, (msg, match) => {
        if (msg.chat.id != ar.get("controlGroup")) return;
        channelMap.clear();
        serialMap.clear();
        list.channels = {};
        channelSErial = getChannelSerial();
        fs.writeFile("ch.txt", "", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("channels deleted");
});
        bot.sendMessage(msg.chat.id, ar.get('all channels have been deleted'));

    });
// delete single post from single channel
    bot.onText(/^\/delete (\d+)\s?from\s?(\d+)$/, (msg, match) => {
        if (msg.chat.id != ar.get("controlGroup")) return;
        list.deleteSinglePost(match[1], match[2], bot, (result) => {
            bot.sendMessage(msg.chat.id, ar.get(result));
        });
    });

    bot.onText(/^\/help$/, msg => {
        if (msg.chat.id != ar.get("controlGroup")) return;
            bot.sendMessage(msg.chat.id, ar.get("help"), {parse_mode: "HTML"});
    });
//todo: add auto send / delete feature (auto pilot mode)
//auto sending list
    // bot.onText(/^\/auto\n/, (msg, match) => {
    //     if (msg.chat.id != ar.get("controlGroup")) return;
    //         let text = msg.text.replace("/auto\n", "");
    //         let postCodes = text.split("\n").map( code => code.trim()).filter( code => /^\d+$/.test(code));
    //         let finishMsg = "- new channels added -";
    //         let i = 0;
    //         postCodes.forEach( code => {
    //             autoListQueue.pushTask( (done) => {
    //                 console.log('this is code', code);
    //                 database.findPost(code, (err, realPost) => {
    //                     if (err || realPost == null) {
    //                         bot.sendMessage(ar.get("controlGroup"), ar.get(" there is no post for ") + code , {parse_mode: "HTML"});
    //                         console.log(err);
    //                         return;
    //                     }
    //                     //console.log(realPost);
    //                     send(bot, list, realPost, 1000 * 4, (completed, couldntSend) => {
    //         let x = couldntSend.length == 0? '0' : couldntSend.toString();
    //         bot.sendMessage(ar.get("controlGroup"), `ok = ${completed - couldntSend.length}\n fail = ${x}`, {parse_mode: "HTML"});
    //     });
    //                     //     (err, x, channel) => {
    //                     //     if ( result ){}
    //                     //     let chSerial = ([...people].find(([, v]) => v === channel.toString() ) ||[])[0];
    //                     //         list.deleteSinglePost( code,  bot, (result) => {
    //                     //             bot.sendMessage(msg.chat.id, result);
    //                     //         });
    //                     // });
    //                     bot.sendMessage(ar.get("controlGroup"), "جاري الارسال . . . .", {parse_mode: "HTML"});
    //                 });    
    //             });
    //         });
    //         console.log(postCodes);
    // });
    bot.on('message', (msg) => {
        if (!msg.text) return;
        const chatId = msg.chat.id;
        const text = msg.text.match(/\/.*@/)? msg.text.match(/\/.*@/)[0] : null;
        let commands = ['/addall@', '/add@', '/rem@', '/send@', '/del@', '/delete@', '/remall@'];
        if (commands.indexOf(text) > -1)
            bot.sendMessage(chatId, ar.get(text), {parse_mode: "HTML"});
    });

    bot.on('callback_query', msg => {
        var chatId      = msg.message.chat.id;
        
        if(chatId != ar.get("controlGroup")) return;

        var message_id  = msg.message.message_id;
        var data        = JSON.parse(msg.data);
        var userId      = msg.from.id;
    //  var userId      = msg.from.id;
    //  var username    = msg.from.username? msg.from.username.toLowerCase() : null;

        if (data[0] == 'del'){
            bot.sendMessage(chatId, ar.get('deleting . . .')).then( deleting => {
                    list.deletePost(bot, data[1], (err, couldntDel, i) => {
                        bot.deleteMessage(chatId, deleting.message_id);
                    if(err)
                    return bot.sendMessage(chatId, ar.get(err));

                try {
                    var x = couldntDel.length ? couldntDel.map(ch => channelMap.get(ch.toString()).join(" - ")
                ).
                    join("\n")
                :
                    " - - ";
                } catch (e) {
                    var x = "please report this to admin 1";
                }
                bot.sendMessage(chatId, ar.get('del from all report').replace('$ok', i - couldntDel.length).replace(/\$fail/gm, couldntDel.length).replace(/\$channels/gm, x));
            });
        });
            bot.deleteMessage(chatId, message_id);
        }
    });




}






function send(bot, list, realPost, timeout, callback) {
    let all = 0, completed = 0, couldntSend = [];
    for (let channel in list.channels) {
        all++;
        messagesQueue.pushTask(function (done) {
            let types = {
                text: () => bot.sendMessage(channel, realPost.head.text, realPost.opts),
                sticker: () => bot.sendSticker(channel, realPost.head.sticker, realPost.opts),
                photo: () => bot.sendPhoto(channel, realPost.head.photo, realPost.opts),
                doc:   () => bot.sendDocument(channel, realPost.head.doc, realPost.opts),
                video: () => bot.sendVideo(channel, realPost.head.video, realPost.opts),
                voice: () => bot.sendVoice(channel, realPost.head.voice, realPost.opts),
            };
            let type = Object.keys(types).find(t => t in realPost.head);

            types[type]().then(msg => {
                list.addRef(msg.message_id, msg.chat.id, realPost._id);
            }).catch(err => {
                console.trace(err);
                couldntSend.push(channel);
            }).then(() => {
                //callback(err, undefined, channel);
                if (++completed >= all)
                    callback(completed, couldntSend);
                setTimeout(() => {
                    done();
                }, timeout);
            });
        });
    }
}

let channelSErial = getChannelSerial();

function* getChannelSerial () {
  let i = 0;
  while ( true ) {
  	yield ++i;
  }
}