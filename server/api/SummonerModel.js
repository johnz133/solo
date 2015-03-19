var mongoose = require('mongoose'),
    crypto   = require('crypto');

var SummonerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lowerCaseName: String,
  profileIconId: Number,
  matchHistoryUri: String,
  lastUpdated: Number,
  totalGameTime: Number,
  totalGoldEarned: Number,
  totalKill: Number,
  totalDeath: Number,
  totalWardsPlaced: Number,
  totalGamesPlayed: Number,
  avgGPM: Number,
  avgKDA: Number,
  avgWard: Number //avg ward placed
});

module.exports = mongoose.model('Summoner', SummonerSchema);
