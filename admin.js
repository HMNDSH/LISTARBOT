const adminChat = 'ID GROUPs';
const database = require('./data.js');
var waitingForPost = 0;
var postId = 0;

module.exports = function (bot) {


	bot.onText(/^\/users$/, (msg, match) => {
		if(msg.chat.id != adminChat) return;
	    var chatId = msg.chat.id;
	  
	        
	    database.countUsers((errorMessage, result) => {
	       if(errorMessage){
	           bot.sendMessage(chatId, errorMessage);
	       }else{
	           bot.sendMessage(chatId, `عدد المشتركين في البوت = *${result}*.`, {parse_mode: "Markdown"});
	       }
	    });
	   
	   
	    //bot.sendMessage(msg.chat.id, usersNum);
	    
	});

	bot.on('message', msg =>{
		var chatId = msg.chat.id;
		if(chatId != adminChat){
			return;
		} 
		if (msg.text === "/fwd"){
			bot.sendMessage(chatId, "الرسالة التالية سيتم تحويلها لجميع المشتركين في البوت. \n /cancel - للالغاء");
			waitingForPost = 1;
		}else if(waitingForPost === 1){
			waitingForPost = 0;
			if (msg.text === "/cancel"){
				bot.sendMessage(chatId, "تم الغاء الطلب بنجاح");	
				return;
			}
			postId = msg.message_id;
			bot.sendMessage(chatId, "هل انت متاكد من تحويل الرسالة اعلاه لجميع المشتركين؟؟\n /cancel - للالغاء. \n /yes - للارسال.");
		}else if(msg.text === "/yes" && waitingForPost === 0 && postId !== 0){
			bot.sendMessage(chatId, "جاري الارسال يرجى الانتظار لطفاً");
			database.getAllUsers((err, users)=>{
				if (err){
					console.log(err);
					return;
				}
				var i = users.length - 1;
				(function theLoop (users, i) {
				  setTimeout(function () {
				
				   console.log(users[i]);
				   	if (users[i] && users[i]._id){
				   		try{
				   			bot.forwardMessage(users[i]._id, chatId, postId).then((msg)=>{
				   				console.log(msg);
				   				
				   			});
				   		}catch(e){
				   		}	
				   	}
				   	i--
				    if (i >= 0) {      
				      theLoop(users, i); 
				    }else{
				    	bot.sendMessage(chatId, "تم الارسال لجميع المشتركين بنجاح ✅");
				    }
				  }, 1000/30);
				})(users, i);			
			});
		}else if(msg.text === "/cancel" && waitingForPost === 0 && postId !== 0){
			bot.sendMessage(chatId, "تم الغاء الطلب بنجاح");	
		}

if (msg.text === "/send"){
			bot.sendMessage(chatId, "الرسالة التالية سيتم  نشرها لجميع المشتركين في البوت. \n /cancel - للالغاء");
			waitingForPost = 2;
		}else if(waitingForPost === 2){
			waitingForPost = 3;
			if (msg.text === "/cancel"){
				bot.sendMessage(chatId, "تم الغاء الطلب بنجاح");	
				return;
			}
			postId = msg.text;
			bot.sendMessage(chatId, "هل انت متاكد من  ارسال الرسالة اعلاه لجميع المشتركين؟؟\n /cancel - للالغاء. \n /yes - للارسال.");
		}else if(msg.text === "/yes" && waitingForPost === 3 && postId !== 0){
			bot.sendMessage(chatId, "جاري الارسال يرجى الانتظار لطفاً");
			database.getAllUsers((err, users)=>{
				if (err){
					console.log(err);
					return;
				}
				var i = users.length - 1;
				(function theLoop (users, i) {
				  setTimeout(function () {
				
				   console.log(users[i]);
				   	if (users[i] && users[i]._id){
				   		try{
				   			bot.sendMessage(users[i]._id, postId).then((msg)=>{
				   				console.log(msg);
				   				
				   			});
				   		}catch(e){
				   		}	
				   	}
				   	i--
				    if (i >= 0) {      
				      theLoop(users, i); 
				    }else{
				    	bot.sendMessage(chatId, "تم الارسال لجميع المشتركين بنجاح ✅");
				    }
				  }, 1000/30);
				})(users, i);			
			});
		}else if(msg.text === "/cancel" && waitingForPost === 0 && postId !== 0){
			bot.sendMessage(chatId, "تم الغاء الطلب بنجاح");	
		}


	});


}