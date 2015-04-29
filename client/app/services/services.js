angular.module('dyerb.services', [])

.factory('Home', function($http){
  var search = function(user){
    return $http({
      method: 'GET',
      url: '/api/'+user.region+'/'+user.name,
      data: user
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    search: search
  };
});
