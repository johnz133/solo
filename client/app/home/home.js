// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('dyerb.home', ['ngMaterial', 'ngMessages', 'chart.js'])

.controller('HomeController', function ($scope, $window, $location, Home) {
  $scope.user = {
    region: 'na',
  };
  $scope.series = ['Average', 'Last Game'];
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // $scope.series = ['Series A', 'Series B'];

  $scope.GPMData = [[0],[0]];
  $scope.wardData = [[0],[3]];
  $scope.KDAData = [[0],[0]];
  $scope.data2 = [
    ['7'],['400'],['1.5']
    // [65, 59, 80, 81, 56, 55, 40],
    // [28, 48, 40, 19, 86, 27, 90]
  ];


  $scope.data = {};
  $scope.search = function(){
    $scope.loading = true;
    Home.search($scope.user)
        .then(function(data){
          $scope.data = data;
          $scope.wardData = [[8], [$scope.data.avgWard]];
          $scope.GPMData = [[300], [$scope.data.avgGPM]];
          $scope.KDAData = [[1.5], [$scope.data.avgKDA]];
          $scope.loading = false;
          console.log($scope.data);
        });
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
