'use strict';

angular.module('myApp.manageDraftReports', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/manageDraftReports', {
            templateUrl: 'views/manageDraftReports.html',
            controller: 'manageDraftReportsCtrl'
        }).when('/dashboard',{
            templateUrl:'views/dashboard.html',
            controller:'manageDraftReportsCtrl'
        })

    }])



    .controller('manageDraftReportsCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$filter',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$filter) {

        $rootScope.title = 'Manage Draft Reports';
        $scope.view = {};
        $scope.view.title = 'Manage Draft Reports';
        $scope.view.showOptions = true;
        $scope.numbers = {};
        $rootScope.userData = $sessionStorage.userData;



        var getViews = function () {
            apiFactory.getViews().then(function (response) {
                if (response.data.length !== 0){
                    $scope.details = $filter('draftFilter')(response.data);
                  /*  var drafts = $filter('draftFilter')(response.data);
                    var unauthorised = $filter('authorizedFilter')(response.data);
                    var unpublished = $filter('publishedFilter')(response.data)*/

                }else{

                 }
             /*   $scope.numbers.drafts = drafts.length;
                $scope.numbers.unauthorized = unauthorised.length;
                $scope.numbers.unpublished = unpublished.length;*/

            },function () {
                $sessionStorage.action = {
                    message: 'Failed to Load Transactions',
                    success: false,
                    failure : false,
                    network: true
                };
            })
        };

        getViews();

        $scope.pass = function (detail) {
            console.log(detail);
            $sessionStorage.mainTree = detail;
        }





    }]);