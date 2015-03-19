(function () {

    'use strict';
    //TODO: either refactor or combine for readability
    var Q     = require('q'),
    Summoner  = require('./SummonerModel.js'),
    Match     = require(('./MatchModel.js'));

    var config    = require('./../config.js');
    var LolApi    = require('leagueapi');
    LolApi.init(process.env.riotKey || config.apiKey, 'na');

    var apiController = {};

    apiController.addRegion = function(req, res, next, region){
      req.region = region;
      next();
    };

    apiController.findSummonerID = function(req, res, next, name) {
      var findID = Q.nbind(Summoner.findOne, Summoner);
      findID({lowerCaseName: name.toLowerCase()})
            .then(function (summoner){
              if(summoner){
                // if(summoner.lastUpdated + 3600000 > Date.now()){
                  //TODO: just query the db for the data
                  // console.log("you've updated already!");
                  // res.json({
                  //   summoner: 'check back in ' + Math.floor((summoner.lastUpdated+3600000-Date.now() / (60 * 1000)) % 60)
                  // });
                // }
                // console.log("GET:", summoner);
                req.id = summoner.id;
                req.name = summoner.name;
                req.profileIconId = summoner.profileIconId;
                req.lastUpdated = summoner.lastUpdated;
                // var updateTime = Q.nbind(Summoner.update, Summoner);
                // updateTime({id: req.id}, {
                //   lastUpdated: Date.now()
                // }).then(function(){
                //   next();
                // });
                next();
              } else {
                LolApi.Summoner.getByName(name, function(err, summoner) {
                    if(!err) {
                      //TODO: add information to db!
                      var newSummoner;
                      var createSummoner = Q.nbind(Summoner.create, Summoner);
                      for(var prop in summoner){
                        newSummoner = {
                          name: prop,
                          lowerCaseName: prop.toLowerCase(),
                          id: summoner[prop].id,
                          profileIconId: summoner[prop].profileIconId,
                          lastUpdated: Date.now(),
                          avgGPM: 0,
                          avgWard: 0,
                          avgKDA: 0
                        };
                      }
                      createSummoner(newSummoner)
                        .then(function (createdSummoner){
                          req.id = createdSummoner.id;
                          // console.log("Created New Summoner: ",createdSummoner);
                          next();
                        });

                    } else {
                      // res.send(req.body);
                      console.error(name + 'doest exist!');
                      // next(new Error(name + " don't exist!"));
                        //TODO: tell the user this name doesn't exist
                        res.json({
                          summoner: 'does not exist'
                        });
                    }
                });
                // next(new Error('Summoner not added yet'));
              }
            })
            .fail(function(err){
              next(err);
            });
    };

    apiController.get = function(req, res, next){
      res.json({yo:'yo'});
    };

    //TODO refactor this with Q,
    //TODO refactor inputing array
    var getMatchHistory = function(req, res, cb){
      LolApi.getMatchHistory(req.id, {endIndex:15}, req.region, function(err, matches){
        if(err){
          console.error(err);
          // next(new Error(err));
        }
        if(!matches){
          console.log('failed to get matches');
          //TODO: try again
        }

        if(Object.keys(matches).length === 0){
          console.log("No ranked games available!");
          res.json({
            summoner: 'doesnt have any ranked games'
          });
        } else {
          var findOneAndUpdate = Q.nbind(Match.findOneAndUpdate, Match);

          var counter = 0;
          for(var i = 0; i < matches.matches.length; i++){
            console.log(i, matches.matches[i].matchId);
            counter++;
            findOneAndUpdate({matchId: matches.matches[i].matchId}, matches.matches[i], {upsert:true})
              .then(function(match){
                if(match){
                  console.log('match', match.matchId, 'successfully updated!');
                } else {
                  console.error('failed to updated match!');
                }
                counter--;
                if(counter === 0){
                  console.log('last match!');
                  cb(req, res);
                }
              });
          }
        }
      });
    };

    apiController.handleRequest = function(req, res, next){
      //take out the true
      if(true || req.lastUpdated + 3600000 < Date.now()){
        getMatchHistory(req, res, analyzeGames);
      }
      // analyzeGames(req, res);
      // sendData(req, res);
    };

    apiController.sendData = function(req, res){

    };

    var analyzeGames = function(req, res, next){
      var findMatches = Q.nbind(Match.find, Match);
      findMatches({'participantIdentities.player.summonerId':req.id})
        .then(function(matches){
          // console.log(matches);
          var avgWard, avgGPM, avgKDA, match, participantId, j, length, stats;
          avgWard = avgGPM = avgKDA = 0;
          for(var i = 0; i < matches.length; i++){
            match = matches[i];
            length = match.participantIdentities.length;
            for(j = 0; j < length; j++){
              if(match.participantIdentities[j].player.summonerId === req.id){
                participantId = match.participantIdentities[j].participantId;
                break;
              }
            }
            for(j = 0; j < length; j++){
              stats = match.participants[j].stats;
              if(match.participants[j].participantId === participantId){
                avgWard += stats.wardsPlaced;
                avgGPM += stats.goldEarned/60;
                avgKDA += (stats.kills + stats.assists) / stats.deaths;
              }
            }
          }
          avgWard = (avgWard/matches.length).toFixed(2);
          avgKDA = (avgKDA/matches.length).toFixed(2);
          avgGPM = (avgGPM/matches.length).toFixed(2);
          console.log('yeah!');
          res.json({
            matches: matches,
            avgWard: avgWard,
            avgGPM: avgGPM,
            avgKDA: avgKDA,
          });
        });
    };

    //obsolete
    var getRecentGames = function(req, res, next){
      // var id = req.id;
      // console.log(req.id);
      LolApi.getRecentGames(req.id, req.region, function(err, games){
        if(err) {
          next(new Error(err));
          // console.log(err);
        }
        // console.log(games);

        //analyze games!
        var avgWard = 0;
        var avgGPM = 0;
        var avgKDA = 0;
        for(var i = 0; i < games.length; i++){
          console.log(games[i]);
          avgWard += games[i].stats.wardPlaced || 0;
          avgGPM += games[i].stats.goldEarned /(games[i].stats.timePlayed / 60);
          avgKDA += (games[i].stats.championsKilled || 0 + games[i].stats.assists||0) / games[i].stats.numDeaths||1;
        }
        avgWard = avgWard/10;
        avgKDA = (avgKDA/10).toFixed(2);
        avgGPM = (avgGPM/10).toFixed(2);

        //Update model
        //we don't have to wait on the database for the callback. instead, immediately respond
        // var updateSummoner = Q.nbind(Summoner.update, Summoner);
        Summoner.update({id: req.id}, {
          avgWard: avgWard,
          avgGPM: avgGPM,
          avgKDA: avgKDA
        }).exec();
        // console.log('average ward placed: ', avgWard/10);
        // console.log('average gpm: ', (avgGPM/10).toFixed(2));
        // console.log('average KDA: ', avgKDA/ 10);
        res.json({
          avgWard: avgWard,
          avgGPM: avgGPM,
          avgKDA: avgKDA,
          length: games.length
        });
        // next(new Error('yes!'));
      });
      // res.json({games: 's'});
      // next();
    };

  module.exports = apiController;
}());
