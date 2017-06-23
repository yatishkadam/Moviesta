var mongoose=require('mongoose');
var followSchema=mongoose.Schema({
    follower:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"},
    following:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"}
},{collection:'follow'});

module.exports=followSchema;