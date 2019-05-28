'use strict';

angular.module('myApp.landing', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/landing', {
            templateUrl: 'views/landing.html',
            controller: 'landingCtrl'
        })

    }])



    .controller('landingCtrl', ['$scope','$rootScope','$sessionStorage','$location',function($scope,$rootScope,$sessionStorage,$location) {

        $rootScope.title = 'Landing';
        $sessionStorage.access = {};




    }]);