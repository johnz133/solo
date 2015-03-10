var Q         = require('q'),
    Summoner  = require('./summonerModel.js');

var config      = require('./../config.js');
var LolApi = require('leagueapi');
LolApi.init(process.env.riotKey || config.apiKey, 'na');

module.exports = {
  addRegion: function(req, res, next, region){
    req.region = region;
    next();
  },
  findSummonerID: function(req, res, next, name) {
    var findID = Q.nbind(Summoner.findOne, Summoner);
    findID({name: name})
          .then(function (summoner){
            if(summoner){
              req.id = summoner.id;
              next();
            } else {
              LolApi.Summoner.getByName(name, function(err, summoner) {
                  if(!err) {
                    //TODO: add information to db!
                    req.id = summoner[name].id;
                    next();
                    console.log(summoner);

                  } else {
                    // res.send(req.body);
                    next(new Error(name + " don't exist!"));
                  }
              });
              // next(new Error('Summoner not added yet'));
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
    LolApi.getRecentGames(req.id, req.region, function(err, games){
      if(err) {
        next(new Error(err));
        // console.log(err);
      }
      var avgWard = 0;
      var avgGPM = 0;
      var avgKDA = 0;
      for(var i = 0; i < games.length; i++){
        // console.log(games[i]);
        avgWard += games[i].stats.wardPlaced || 0;
        avgGPM += games[i].stats.goldEarned /(games[i].stats.timePlayed / 60);
        avgKDA += (games[i].stats.championsKilled || 0 + games[i].stats.assists||0 / 2) / games[i].stats.numDeaths||1;
      }
      console.log('average ward placed: ', avgWard/10);
      console.log('average gpm: ', (avgGPM/10).toFixed(2));
      console.log('average KDA: ', avgKDA/ 10);
      res.json({
        avgWard: avgWard/10,
        avgGPM: (avgGPM/10).toFixed(2),
        avgKDA: avgKDA/10,
        length: games.length
      });
      // next(new Error('yes!'));
    });
    // res.json({games: 's'});
    // next();
  }
};
