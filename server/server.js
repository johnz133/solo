var express     = require('express'),
    mongoose    = require('mongoose'),
    champId     = require('./championKey.js');

var app = express();


mongoose.connect(process.env.mdbSandbox || 'mongodb://localhost/dyerb'); // connect to mongo database

// configure our server with all the middleware and and routing
require('./utils/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;
