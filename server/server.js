var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config.js'),
    champId     = require('./championKey.js');

var app = express();

// var LolApi = require('leagueapi');

// LolApi.init(config.apiKey, 'na');

// LolApi.getChampions(true, function(err, champs) {
//   // console.log(champs);
//     champs.forEach(function(champ) {
//         if(champ.freeToPlay) console.log(champId[champ.id] + ' is free to play!!');
//     });
// });


// // LolApi.getQueues( function(err, something){
// //   console.log(something);
// // });
// LolApi.Summoner.getByName('jzeezy', function(err, summoner) {
//     if(!err) {
//       // console.log(summoner);
//       LolApi.getRecentGames(summoner['jzeezy'].id, 'na', function(err, games){
//         if(err) {
//           console.log(err);
//         }
//         var avgWard = 0;
//         var avgGPM = 0;
//         var avgKDA = 0;
//         for(var i = 0; i < games.length; i++){
//           // console.log(games[i]);
//           avgWard += games[i].stats.wardPlaced || 0;
//           avgGPM += games[i].stats.goldEarned /(games[i].stats.timePlayed / 60);
//           avgKDA += (games[i].stats.championsKilled || 0 + games[i].stats.assists||0 / 2) / games[i].stats.numDeaths||1;
//         }
//         console.log('average ward placed: ', avgWard/10);
//         console.log('average gpm: ', (avgGPM/10).toFixed(2));
//         console.log('average KDA: ', avgKDA/ 10);
//       });
//     }
// });

//The wrapper also accepts promises:
// LolApi.Summoner.getByName('jzeezy')
// .then(function (summoner) {
//     console.log(summoner);
// });

mongoose.connect('mongodb://localhost/dyerb'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./utils/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;


/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middlware.js file for setup
    we also exported our server for easy testing, it is then started in index.js

  middleware.js requires all epxpress middlware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has it's own folder with a model, controller, and route file
    the respective file is requierd in middlware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to request

*/
