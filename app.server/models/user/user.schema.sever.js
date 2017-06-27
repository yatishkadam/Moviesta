var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
    email:String,
    url: String,
    phone:String,
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref : "reviewModel"}],
    roles: [{type:String,default:'USER',enum : ['USER','CRITIC','ADMIN']}],
    dateCreated:{type:String,default:Date.now},
    google : {
        id:String,
        token:String
    },
    facebook : {
        id:String,
        token:String
    }

},{collection:"user"});

module.exports = userSchema;