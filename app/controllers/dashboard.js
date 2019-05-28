'use strict';

angular.module('myApp.dashboard', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        })

    }])



    .controller('dashboardCtrl', ['$scope','$rootScope','$sessionStorage','apiFactory','$filter',function($scope,$rootScope,$sessionStorage,apiFactory,$filter) {

        $rootScope.title = 'Dashboard';
        $scope.view = {};
        $scope.view.title = 'Welcome';
        $scope.numbers = {};
        $rootScope.userData = $sessionStorage.userData;



        var getViews = function () {
            apiFactory.getViews().then(function (response) {
                if (response.data.length !== 0){
                    var drafts = $filter('draftFilter')(response.data);
                    var unauthorised = $filter('authorizedFilter')(response.data);
                    var unpublished = $filter('publishedFilter')(response.data);
                    var rejected = $filter('rejectedFilter')(response.data)

                }else{

                }
                $scope.numbers.drafts = drafts.length;
                $scope.numbers.unauthorized = unauthorised.length;
                $scope.numbers.unpublished = unpublished.length;
                $scope.numbers.rejected = rejected.length;

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





    }]);