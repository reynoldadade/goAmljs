'use strict';

angular.module('myApp.logout', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'logout_Ctrl'
    })
}]);

//logout
app.controller('logout_Ctrl',['$location','$sessionStorage','$scope',function ($location,$sessionStorage,$rootScope) {
    $sessionStorage.userData.login = false;
    $rootScope.userData.login = false;

    $sessionStorage.$reset();

    $location.path('/login');

}]);
