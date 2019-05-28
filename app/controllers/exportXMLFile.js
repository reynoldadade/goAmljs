'use strict';

angular.module('myApp.exportXMLFile', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/exportXMLFile', {
            templateUrl: 'views/exportXMLFile.html',
            controller: 'exportXMLFileCtrl'
        })

    }])



    .controller('exportXMLFileCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$route',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$route) {

        $rootScope.title = 'Export XML';
      
        $rootScope.userData = $sessionStorage.userData;

        $scope.action = $sessionStorage.action;



        var getReportType = function () {
            apiFactory.reportType().then(function (response) {
                $scope.reportTypes = response.data;
                //console.log(response.data)
            })
        };

        getReportType();
        
        
        
        $scope.getXMLExport = function () {
            
        }












    }]);