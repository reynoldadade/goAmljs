'use strict';

angular.module('myApp.login', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
    })

}])

.controller('loginCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$http',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$http) {

$rootScope.title = 'Welcome';
$sessionStorage.access = {};
$rootScope.userData = {}
$rootScope.userData.login = false;




$scope.login = function () {
    $scope.spin = true;
   var input = {
        "userName": $scope.username,
        "password": $scope.password

    };
    //console.log(input);
      apiFactory.login(input).then(function (response) {
          //console.log(response);
          if (response.statusText === 'OK' || response.status === 200){
              $sessionStorage.token = response.data.access_token;
              $sessionStorage.expiry_date = response.data.expires_in;

              apiFactory.getUser(response.data.userName).then(function (response) {
                 if (response.data){
                    $sessionStorage.userData = response.data;
                    $sessionStorage.userData.login = true;
                    console.log(response.data);

                     $location.path('/dashboard')
                 }else{
                     $scope.message = response.data.message;
                     $scope.spin = false;
                 }
              });

              //console.log($sessionStorage.token)

          }else{
              $scope.message = response.data.message;
              $scope.spin = false;
          }

      },function (response) {
          $scope.message = response.data.message;
          $scope.spin = false;
      });



}


}]);