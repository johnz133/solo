var apiController = require('./apiController.js');

module.exports = function(app){
  //app = apiRouter injected from middleware.js

  app.param('region', apiController.addRegion);
  // app.param will hijack any request with a 'name'
  // parameter below on the get function.
  // this code will actually become the summoner id
  // after we fetch it from our db. if no id exists for
  // the name, then we send a request to riot.
  app.param('name', apiController.findSummonerID);

  app.route('/')
     .get(apiController.get);

  //TODO is it get recent games, or analyzeGames?
  app.get('/:region/:name', apiController.getRecentGames);
};
