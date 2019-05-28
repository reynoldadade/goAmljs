'use strict';

angular.module('myApp.addIndicators', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/addIndicators', {
            templateUrl: 'views/addIndicators.html',
            controller: 'addIndicatorsCtrl'
        })

    }])



    .controller('addIndicatorsCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$q',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$q) {

        $rootScope.title = 'Add Report Indicators';
        $sessionStorage.access = {};
        $scope.mainTree = $sessionStorage.mainTree;
        var run;
        var indicatorObject = {
            lk_code:'',
            reportid: ''
        };
        var indicatorObjectArray = [];
        console.log($scope.mainTree, 'mainTree')
        $scope.chosenIndicators = [];
        $scope.chosenIndicatorCodes = [];
        $scope.action = $sessionStorage.action;
        $rootScope.userData = $sessionStorage.userData;


        var getIndicatorType = function () {
            apiFactory.indicatorType().then(function (response) {
                $scope.indicatorTypes = response.data;
                //console.log(response.data)
            })
        };

        $scope.selectedIndicator = function (indicatorType) {
            $scope.selected = $scope.indicatorTypes.indexOf(indicatorType)
        };


        $scope.setIndicators = function () {
            if ($scope.chosenIndicators.indexOf($scope.indicatorTypes[$scope.selected]) === -1){
                $scope.chosenIndicators.push($scope.indicatorTypes[$scope.selected]);
                $scope.chosenIndicatorCodes.push($scope.indicatorTypes[$scope.selected].lk_code);
                //console.log( $scope.chosenIndicatorCodes);

            }else{
                $scope.chosenIndicators.splice($scope.chosenIndicators.indexOf($scope.indicatorTypes[$scope.selected]),1);
                $scope.chosenIndicatorCodes.splice($scope.chosenIndicatorCodes.indexOf($scope.indicatorTypes[$scope.selected].lk_code),1);
                //console.log( $scope.chosenIndicatorCodes);
            }
        };

        var addReportIndicator = function (start) {

            var chosenCodes = $scope.chosenIndicatorCodes;
            run = true;

          /*  chosenCodes.forEach(function (element) {
                indicatorObject.lk_code = element;
                indicatorObject.reportid = $scope.mainTree.id;
                indicatorObjectArray.push(indicatorObject);
                console.log(indicatorObjectArray);
            });*/
            
            angular.forEach(chosenCodes,function (value) {
                var indicatorObject = {
                    lk_code:'',
                    reportid: ''
                };
                indicatorObject.lk_code = value;
                indicatorObject.reportid = $scope.mainTree.id;
                indicatorObjectArray.push(indicatorObject);
                //console.log(indicatorObjectArray);
            });

            $scope.mainTree.report_Indicators=indicatorObjectArray;
            //console.log($scope.mainTree)


                var object = indicatorObjectArray;


            console.log(object, 'object');

            apiFactory.addIndicator(object).then(function (response) {
                console.log(response, 'response');
                if (response.data && response.statusText === 'OK'){
                    $sessionStorage.action = {
                        message: 'Indicator Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                    if(start === true){
                        $location.path('/reportTransactions')
                    }
                    else if(start === false){
                        $location.path('/newReport')
                    }
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add Indicator',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $route.reload();
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Failure',
                    success: false,
                    failure: false,
                    network: true
                };
                $route.reload()
            })

                /* apiFactory.putMainTree($scope.mainTree,$scope.mainTree.id).then(function (response) {
                     //console.log('sending')
                     console.log(response);
                     if (response.statusText === 'OK'){
                         $sessionStorage.action = {
                             message: 'Indicator Added Successfully',
                             success: true,
                             failure : false,
                             network: false
                         };
                         if(start === true){
                             $location.path('/reportTransactions')
                         }
                         else if(start === false){
                             $route.reload()
                         }
                     }else{
                         $sessionStorage.action = {
                             message: 'Failed to Add Indicator',
                             success: false,
                             failure : true,
                             network: false
                         };
                         $route.reload();
                     }
                 },function () {
                     $sessionStorage.action = {
                         message: 'Network Failure',
                         success: false,
                         failure : false,
                         network: true
                     };
                     $route.reload()

                 })*/
        };

        $scope.addReportIndicator = function () {
            addReportIndicator(false);
        };

        $scope.addReportIndicatorAndContinue = function () {
            addReportIndicator(true);
           /* var promise  = $q(function (resolve,reject) {
               addReportIndicator();
                if (run === true){
                    resolve('success')
                }

            }).then(function () {
                $location.path('/reportTransactions')
            },function () {
                $route.reload();
            });*/
        };

        getIndicatorType();




    }]);