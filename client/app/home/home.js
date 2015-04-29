angular.module('dyerb.home', ['ngMaterial', 'ngMessages', 'chart.js'])

.controller('HomeController', function ($scope, $window, $location, Home) {
  $scope.user = {
    region: 'na',
  };

  $scope.series = ['Average', 'Last Game'];

  $scope.data2 = [
    ['7'],['400'],['1.5']
  ];

  $scope.numMatches = 10;
  $scope.split = false;
  $scope.lineStat = 0;
  $scope.stats = ['Gold Per Minute', 'KDA Ratio', 'Wards Placed'];
  $scope.lineSeries = ['Gold Per Minute'];
  $scope.lineLabel = [];
  $scope.lineData = [[]];

  $scope.data = undefined;
  $scope.search = function(){
    $scope.loading = true;
    Home.search($scope.user)
        .then(function(data){
          $scope.data = data.matches;
          analyzeAverage();
          $scope.analyzeStat();
          $scope.loading = false;
          console.log(data);
        });
  };

  var analyzeAverage = function(){
    var avgGPM, avgKDA, avgWard, participantId, participants;
    avgGPM = avgKDA = avgWard = 0;
    for(var i = 0; i < Math.min($scope.data.length, $scope.numMatches); i++){
      for(var j = 0; j < $scope.data[i].participantIdentities.length; j++){
        if($scope.data[i].participantIdentities[j].player.summonerName.toLowerCase() === $scope.user.name.toLowerCase()){
          participantId = $scope.data[i].participantIdentities[j].participantId;
          break;
        }
      }
      for (j = 0; j < $scope.data[i].participants.length; j++) {
        if($scope.data[i].participants[j].participantId === participantId){
          participants = $scope.data[i].participants[j];
          break;
        }
      }

      avgGPM += participants.stats.goldEarned / $scope.data[i].matchDuration * 60;
      avgKDA += (participants.stats.assists + participants.stats.kills) / participants.stats.deaths;
      avgWard += participants.stats.wardsPlaced;
    }
    avgKDA = +(avgKDA/Math.min($scope.data.length, $scope.numMatches)).toFixed(2);
    avgGPM = +(avgGPM/Math.min($scope.data.length, $scope.numMatches)).toFixed(2);
    avgWard = +(avgWard/Math.min($scope.data.length, $scope.numMatches)).toFixed(2);
    $scope.wardData = [[avgWard], [participants.stats.wardsPlaced]];
    $scope.GPMData = [[avgGPM], [(participants.stats.goldEarned/$scope.data[Math.min($scope.data.length, $scope.numMatches)-1].matchDuration*60).toFixed(2)]];
    $scope.KDAData = [[avgKDA], [((participants.stats.assists + participants.stats.kills) / participants.stats.deaths).toFixed(2)]];

  };

  $scope.compareGame = function(match){
    var participantId, participants;
    for(var i = 0; i < match.participantIdentities.length; i++){
      if(match.participantIdentities[i].player.summonerName.toLowerCase() === $scope.user.name.toLowerCase()){
        participantId = match.participantIdentities[i].participantId;
        break;
      }
    }
    for (i = 0; i < match.participants.length; i++) {
      if(match.participants[i].participantId === participantId){
        participants = match.participants[i];
        break;
      }
    }
    $scope.wardData[1][0] = participants.stats.wardsPlaced;
    //this just gets the time for the last game, fix!
    $scope.GPMData[1][0] = (participants.stats.goldEarned/$scope.data[$scope.data.length-1].matchDuration*60).toFixed(2);
    $scope.KDAData[1][0] = ((participants.stats.assists + participants.stats.kills) / participants.stats.deaths).toFixed(2);
  };

  //TODO Refactor!
  //TODO: labels
  $scope.analyzeStat = function(split, stat){
    if(split !== undefined){
      $scope.split = split;
    }
    if(stat){
      $scope.lineStat = $scope.stats.indexOf(stat);
    } else {
      stat = $scope.stats[$scope.lineStat];
    }
    var participantId, participants;
    $scope.lineData = $scope.split ? [[],[]] : [[]];
    $scope.lineSeries = $scope.split ? ['Winning '+stat, 'Losing '+stat] : [stat];
    $scope.lineLabel = [];
    for(var i = 0; i < Math.min($scope.data.length, $scope.numMatches); i++){
      for(var j = 0; j < $scope.data[i].participantIdentities.length; j++){
        if($scope.data[i].participantIdentities[j].player.summonerName.toLowerCase() === $scope.user.name.toLowerCase()){
          participantId = $scope.data[i].participantIdentities[j].participantId;
          break;
        }
      }
      for (j = 0; j < $scope.data[i].participants.length; j++) {
        if($scope.data[i].participants[j].participantId === participantId){
          participants = $scope.data[i].participants[j];
          break;
        }
      }
      switch(stat){
        case 'Gold Per Minute':
          $scope.lineData[+($scope.split && participants.stats.winner)].push((participants.stats.goldEarned / $scope.data[i].matchDuration * 60).toFixed(2));
          break;
        case 'KDA Ratio':
          $scope.lineData[+($scope.split && participants.stats.winner)].push(((participants.stats.assists + participants.stats.kills) / participants.stats.deaths).toFixed(2));
          break;
        case 'Wards Placed':
          $scope.lineData[+($scope.split && participants.stats.winner)].push(participants.stats.wardsPlaced);
          break;
        default:
      }
      $scope.lineLabel.push(""+i);
    }
  };

  $scope.updateNumMatches = function(num){
    $scope.numMatches = num;
    $scope.analyzeStat();
  };

  var findParticipant = function(match){
    return participants;
  };
});
