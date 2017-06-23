var mongoose = require("mongoose");

var connectionString = "mongodb://127.0.0.1:27017/project";
if(process.env.MLAB_USERNAME_PROJECT){
    var username = process.env.MLAB_USERNAME_PROJECT;
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://'+username+':'+password;
    connectionString +='';
}
if (process.env.MLAB_USERNAME){
    connectionString = process.env.MLAB_USERNAME+':'+
            process.env.MLAB_PASSWORD+'@'+
            process.env.MLAB_HOST+':'+
            process.env.MLAB_PORT+'/'+
            process.env.MLAB_APP_NAME;
}

mongoose.connect(connectionString);

var db= mongoose.connection;
db.once('open',function () {
    console.log("connected")
});

mongoose.Promise= require("q").Promise;

require("./services/user.service.server");
require("./services/cast.service.server");
require("./services/review.service.server");
require("./services/movie.service.server");
