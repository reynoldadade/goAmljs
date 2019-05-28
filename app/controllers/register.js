'use strict';

angular.module('myApp.register', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerCtrl'
        })

    }])

    .controller('registerCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$route',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$route) {

        $rootScope.title = 'Register User';
        $rootScope.userData = $sessionStorage.userData;
        $scope.action = $sessionStorage.action;

        var getBranch = function () {
            apiFactory.entityBranch().then(function (response) {
                $scope.branches = response.data;
                //console.log(response.data)
            })
        };

        getBranch();






        $scope.register = function () {
            $scope.spin = true;
            var input = {
                "firstName": $scope.register.firstName,
                "lastName": $scope.register.lastName,
                "userName": $scope.register.userName,
                "branch": $scope.register.branch,
                "confirmPassword": $scope.register.confirmPassword,
                "password": $scope.register.password,
                "email": $scope.register.email,
                "phoneNumber": $scope.register.phoneNumber,
                "confirmPhoneNumber": $scope.register.confirmPhoneNumber,
                "birthDate": $scope.register.birthDate
            };
            console.log(input);
           apiFactory.register(input).then(function (response) {
                console.log(response);
               if (response.statusText === 'OK'){
                   $sessionStorage.action = {
                       message: 'User Successfully Registered',
                       success: true,
                       failure : false,
                       network: false
                   };
               }else{
                   $sessionStorage.action = {
                       message: 'Failed to Register User',
                       success: false,
                       failure : true,
                       network: false
                   };
               }
               $route.reload();

            },function (response) {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
                $route.reload();
            });

            $scope.spin = false;
        };



        $scope.closeAlerts = function () {
            $sessionStorage.action = {
                message: '',
                success: false,
                failure : false,
                network: false
            }
        }

    }]);