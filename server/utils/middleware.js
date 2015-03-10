var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser');
    helpers     = require('./helpers.js');

module.exports = function (app, express){
  // Express 4 allows us to use multiple routers with their own configurations
  var apiRouter = express.Router();
  // var linkRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extrended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api', apiRouter);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  require('../api/apiRouter.js')(apiRouter);
};
