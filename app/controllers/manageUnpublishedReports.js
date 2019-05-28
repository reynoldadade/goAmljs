'use strict';

angular.module('myApp.manageUnpublishedReports', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/manageUnpublishedReports', {
            templateUrl: 'views/manageUnpublishedReports.html',
            controller: 'manageUnpublishedReportsCtrl'
        })

    }])



    .controller('manageUnpublishedReportsCtrl', ['$scope','$rootScope','$sessionStorage','apiFactory','$filter',function($scope,$rootScope,$sessionStorage,apiFactory,$filter) {

        $rootScope.title = 'Manage Unpublished Reports';
        $scope.view = {};
        $scope.view.title = 'Manage Unpublished Reports';
        $scope.view.showPublish = true;
        $rootScope.userData = $sessionStorage.userData;



        var getViews = function () {
            apiFactory.getViews().then(function (response) {
                if (response.data.length !== 0){
                    $scope.details = $filter('publishedFilter')(response.data);
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
            $sessionStorage.ispublished = true;
            apiFactory.putUpdateViews($sessionStorage.mainTree,$sessionStorage.mainTree.id).then(function (response) {
                if(response.statusText === 'OK'){
                    $sessionStorage.action = {
                        message: 'Successfully Published',
                        success: true,
                        failure : false,
                        network: false
                    };
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Published',
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


        $scope.publish = function () {
            updateStatus();
        }




    }]);