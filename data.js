var Datastore = require('nedb');  
var posts = new Datastore({ filename: './posts.db', autoload: true });


var users = new Datastore({ filename: './users.db', autoload: true });


var addUser = function(user){

    
    users.insert(user, function(err, doc){
        
        if (err){
            console.log('user is already in the database');
        }else{
            console.log('Inserted', doc.firstName, 'with ID', doc._id);
        }
        
    });
    
}


var countUsers = function(callback){
    var  numberOfUsers;
    users.count({}, function (err, count) {
  
        if (err){
            callback('something went wrong');
        }else{
            callback(undefined, count);
        }
});
}


var getUser = function (userId, callback) {
    
    users.findOne({ _id: userId }, (err, user)=>{
        if(err){
            console.log(err);
            return;
        }
        callback(user);
    });
}
var getAllUsers = function (callback) {
    // body...

    users.find({}, function (err, users) {
  
        if (err){
            callback('something went wrong');
        }else{
            callback(undefined, users);
        }
    });
}
// for increment 
posts.insert({_id: '__autoid__', value: 9});

posts.getAutoId = function(onFind) {
  posts.findOne( { _id: '__autoid__' }, function(err, doc) {
    if (err) {
      onFind && onFind(err)
    } else {
      // Update and returns the index value
      posts.update({ _id: '__autoid__'}, { $set: {value: ++doc.value} }, {},
         function(err, count) {
           onFind && onFind(err, doc.value.toString());
      });
    }
  });
  return posts;
}
//for increment end
var addPost = function (userId, head, opts, callback) {
posts.getAutoId( (err, count) =>{
    posts.insert({_id: count, userId, head, opts}, (err, result) => {
        if ( err ) {
            callback(err);
            return;
        } 
        callback(undefined, result);
    });
});
};

// var addPost = function (userId, head, opts, callback) {
//     posts.insert({userId, head, opts}, (err, result) => {
//         if ( err ) {
//             callback(err);
//             return;
//         } 
//         callback(undefined, result);
//     });
// };

var findPost = function (id, callback) {
    
    posts.findOne({_id: id}, (err, result)=>{
        if ( err ) {
            callback(err);
            return;
        } 
        callback(undefined, result);
    });
};

var getAll = function (callback) {
    posts.find({}, (err, result) => {
      if ( err ) {
        callback(err);
        return;
      }
      callback(undefined, result);
    });
}

module.exports = { 
    addUser,
    countUsers,
    getUser,
    getAllUsers,
    addPost,
    findPost,
    getAll
};



