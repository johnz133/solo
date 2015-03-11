var mongoose = require('mongoose'),
    crypto   = require('crypto');

var SummonerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lowerCaseName: String,
  avgGPM: Number,
  avgKDA: Number,
  avgWard: Number //avg ward placed
});

module.exports = mongoose.model('Summoner', SummonerSchema);
