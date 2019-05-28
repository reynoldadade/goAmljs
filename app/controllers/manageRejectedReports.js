'use strict';

angular.module('myApp.manageRejectedReports', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/manageRejectedReports', {
            templateUrl: 'views/manageRejectedReports.html',
            controller: 'manageRejectedReportsCtrl'
        })

    }])



    .controller('manageRejectedReportsCtrl', ['$scope','$rootScope','$sessionStorage','apiFactory','$filter','$route',function($scope,$rootScope,$sessionStorage,apiFactory,$filter,$route) {

        $rootScope.title = 'Manage Rejected Reports';
        $scope.view = {};
        $scope.view.title = 'Manage Rejected Reports';
        $scope.view.showAuthorise = true;
        $rootScope.userData = $sessionStorage.userData;



        var getViews = function () {
            apiFactory.getViews().then(function (response) {
                if (response.data.length !== 0){
                    $scope.details = $filter('rejectedFilter')(response.data);
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
                        message: 'Failed to Reject',
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







    }]);