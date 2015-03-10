var Q         = require('q'),
    Summoner  = require('./summonerModel.js');

module.exports = {
  findSummonerID: function(req, res, next, name) {
    var findID = Q.nbind(Summoner.findOne, Summoner);
    findID({name: name})
          .then(function (summoner){
            if(summoner){
              req.id = 48182218;
              next();
            } else {
              next(new Error('Summoner not added yet'));
            }
          })
          .fail(function(err){
            next(err);
          });
  },

  get: function(req, res, next){
    res.json({yo:'yo'});
  },

  getRecentGames: function(req, res, next){
    var id = req.ID;
    next();
  }
};
