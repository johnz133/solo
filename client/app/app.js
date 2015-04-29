//creates module 'dyerb', with dependencies
angular.module('dyerb', [
  'dyerb.home',
  'dyerb.services',
  'ngRoute',
])


.config(function($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
})
.run(function ($rootScope, $location, Home) {

});
