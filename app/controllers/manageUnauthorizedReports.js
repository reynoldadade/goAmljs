'use strict';

angular.module('myApp.manageUnauthorizedReports', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/manageUnauthorizedReports', {
            templateUrl: 'views/manageUnauthorizedReports.html',
            controller: 'manageUnauthorizedReportsCtrl'
        })

    }])



    .controller('manageUnauthorizedReportsCtrl', ['$scope','$rootScope','$sessionStorage','apiFactory','$filter','$route',function($scope,$rootScope,$sessionStorage,apiFactory,$filter,$route) {

        $rootScope.title = 'Manage Unauthorized Reports';
        $scope.view = {};
        $scope.view.title = 'Manage Unauthorized Reports';
        $scope.view.showAuthorise = true;
        $rootScope.userData = $sessionStorage.userData;



        var getViews = function () {
            apiFactory.getViews().then(function (response) {
                if (response.data.length !== 0){
                    $scope.details = $filter('authorizedFilter')(response.data);
                }else{

                }

            },function () {
                $sessionStorage.action = {
                    message: 'Failed to Load Transactions',
                    success: false,
                    failure : false,
                    network: true
                };
                $scope.action = $sessionStorage.action;
            })
        };

        getViews();

        $scope.pass = function (detail) {
            //console.log(detail)
            $sessionStorage.mainTree = detail;
        };

        $scope.approve = function () {
            var updateStatus = function () {
                $sessionStorage.mainTree.iscompleted = true;
                $sessionStorage.main.isrejected = false;
                $sessionStorage.mainTree.isauthorized = true;
                apiFactory.putUpdateViews($sessionStorage.mainTree,$sessionStorage.mainTree.id).then(function (response) {
                    if(response.statusText === 'OK'){
                        $sessionStorage.action = {
                            message: 'Authorisation Successful',
                            success: true,
                            failure : false,
                            network: false
                        };
                    }else{
                        $sessionStorage.action = {
                            message: 'Authorisation Failed',
                            success: false,
                            failure : true,
                            network: false
                        };
                    }
                    $route.reload();
                },function () {
                    $sessionStorage.action = {
                        message: 'Network Error',
                        success: false,
                        failure : false,
                        network: true
                    };
                })
            };
        };

       $scope.reject = function () {
           var reject = function () {
               $sessionStorage.mainTree.iscompleted = true;
               $sessionStorage.main.isrejected = true;
               $sessionStorage.mainTree.isauthorized = false;
               apiFactory.putUpdateViews($sessionStorage.mainTree,$sessionStorage.mainTree.id).then(function (response) {
                   if(response.statusText === 'OK'){
                       $sessionStorage.action = {
                           message: 'Rejection Successful',
                           success: true,
                           failure : false,
                           network: false
                       };
                   }else{
                       $sessionStorage.action = {
                           message: 'Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                       };
                   }
                   $route.reload();
               },function () {
                   $sessionStorage.action = {
                       message: 'Network Error',
                       success: false,
                       failure : false,
                       network: true
                   };
               })
           }
       };


    }]);