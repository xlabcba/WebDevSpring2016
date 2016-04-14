var express       = require('express');
var app           = express();
var multipart     = require('connect-multiparty');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
// install and require the mongoose library
var mongoose      = require('mongoose');
var fs            = require('fs');
var path          = require('path');


// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

app.use(multipart({maxFilesSize: 100 * 1024 * 1024}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.bodyParser({ uploadDir: './public/uploads', keepExtensions: true }));
multer();
app.use(session({
    secret: 'this is a secret', //process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, fs, path);

app.listen(port, ipaddress);
