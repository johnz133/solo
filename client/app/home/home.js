// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('dyerb.home', ['ngMaterial', 'ngMessages', 'chart.js'])

.controller('HomeController', function ($scope, $window, $location, Home) {
  $scope.user = {
    region: 'na',
  };

  // $scope.testLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // $scope.testSeries = ['Series A', 'Series B'];

  // $scope.testData = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];

  $scope.series = ['Average', 'Last Game'];

  // $scope.GPMData = [];
  // $scope.wardData = [];
  // $scope.KDAData = [];
  $scope.data2 = [
    ['7'],['400'],['1.5']
    // [65, 59, 80, 81, 56, 55, 40],
    // [28, 48, 40, 19, 86, 27, 90]
  ];


  $scope.data = undefined;
  $scope.search = function(){
    $scope.loading = true;
    Home.search($scope.user)
        .then(function(data){
          $scope.data = data.matches;
          analyze();
          $scope.loading = false;
          console.log(data);
        });
  };

  var analyze = function(){
    var avgGPM, avgKDA, avgWard, participantId, participants;
    avgGPM = avgKDA = avgWard = 0;
    for(var i = 0; i < $scope.data.length; i++){
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
    avgKDA = +(avgKDA/$scope.data.length).toFixed(2);
    avgGPM = +(avgGPM/$scope.data.length).toFixed(2);
    avgWard = +(avgWard/$scope.data.length).toFixed(2);
    $scope.wardData = [[avgWard], [participants.stats.wardsPlaced]];
    $scope.GPMData = [[avgGPM], [(participants.stats.goldEarned/$scope.data[$scope.data.length-1].matchDuration*60).toFixed(2)]];
    $scope.KDAData = [[avgKDA], [((participants.stats.assists + participants.stats.kills) / participants.stats.deaths).toFixed(2)]];

  };

  $scope.compareGame = function(match){
    var participantId, participants;
    for(var j = 0; j < match.participantIdentities.length; j++){
      if(match.participantIdentities[j].player.summonerName.toLowerCase() === $scope.user.name.toLowerCase()){
        participantId = match.participantIdentities[j].participantId;
        break;
      }
    }
    for (j = 0; j < match.participants.length; j++) {
      if(match.participants[j].participantId === participantId){
        participants = match.participants[j];
        break;
      }
    }
    $scope.wardData[1][0] = participants.stats.wardsPlaced;
    $scope.GPMData[1][0] = (participants.stats.goldEarned/$scope.data[$scope.data.length-1].matchDuration*60).toFixed(2)
    $scope.KDAData[1][0] = ((participants.stats.assists + participants.stats.kills) / participants.stats.deaths).toFixed(2);

  };
  // $scope.signin = function () {
  //   Home.signin($scope.user)
  //     .then(function (token) {
  //       $window.localStorage.setItem('com.shortly', token);
  //       $location.path('/links');
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  // $scope.signup = function () {
  //   Home.signup($scope.user)
  //     .then(function (token) {
  //       $window.localStorage.setItem('com.shortly', token);
  //       $location.path('/links');
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };
});
