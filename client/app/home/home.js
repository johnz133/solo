// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('dyerb.home', ['ngMaterial', 'ngMessages'])

.controller('HomeController', function ($scope, $window, $location, Home) {
  $scope.user = {
    region: 'na',
  };

  $scope.data = {};
  $scope.search = function(){
    $scope.loading = true;
    Home.search($scope.user)
        .then(function(data){
          $scope.data = data;
          $scope.loading = false;
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
