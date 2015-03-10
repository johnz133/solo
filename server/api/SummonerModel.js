var mongoose = require('mongoose'),
    crypto   = require('crypto');

var SummonerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  averageGPM: Number,
  averageWardPlaced: Number
});

module.exports = mongoose.model('Summoner', SummonerSchema);
