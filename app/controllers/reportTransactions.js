'use strict';

angular.module('myApp.reportTransactions', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/reportTransactions', {
            templateUrl: 'views/reportTransactions.html',
            controller: 'reportTransactionsCtrl'
        })

    }])



    .controller('reportTransactionsCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$route','$q',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$route,$q) {

        $rootScope.title = 'New Transaction';
        $sessionStorage.access = {};
        $scope.mainTree = $sessionStorage.mainTree;
        //console.log($sessionStorage.mainTree, 'Main Tree Transactions');
        $scope.modalise = {'address':{}};
        $scope.transaction = {};
        $scope.modalise.address.title = 'Add New Location';
        $scope.action = $sessionStorage.action;
        $rootScope.userData = $sessionStorage.userData;





        var postTransaction = function (start) {
            /*$scope.run = true;*/
            var reportTree = {
                "reportid": $scope.mainTree.id,
                "transactionnumber": $scope.transaction.transactionnumber,
                "internal_ref_number": $scope.transaction.internal_ref_number,
                "transaction_location": $scope.transaction.transaction_location,
                "transaction_description": $scope.transaction.transaction_description,
                "date_transaction": $scope.transaction.date_transaction,
                "teller": $scope.transaction.teller,
                "authorized": $scope.transaction.authorized,
                "late_deposit": $scope.transaction.late_deposit,
                "transmode_code": $scope.transaction.transmode_code,
                "transmode_comment": $scope.transaction.transmode_comment,
                "amount_local": $scope.transaction.amount_local,
                "ismultiparty": $scope.transaction.ismultiparty
            };
            console.log(reportTree,'sending this');
            apiFactory.postTransaction(reportTree).then(function (response) {
                $scope.transaction = {};
                if(response.data){
                    $scope.reportTree = response.data;
                    $sessionStorage.reportTree = $scope.reportTree;
                    console.log(response.data);
                    $sessionStorage.action = {
                        message: 'Transaction Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                    if(start === true){
                        $location.path('/addParties')
                    }
                    else if(start === false){
                        $route.reload()
                    }
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to  Add Transaction',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $route.reload();
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : true,
                    network: false
                };
                $route.reload();
            })
        };



        $scope.addTransaction = function() {

            postTransaction(false);
        };
        $scope.addTransactionAndContinue = function () {
            postTransaction(true)
          /*  var promise  = $q(function (resolve,reject) {
                postTransaction()
                if ($scope.run === true){
                    resolve('success')
                }

            }).then(function () {
                $location.path('/addParties')
            });*/
        };


        var getLocation = function () {
            apiFactory.locationType().then(function (response) {
                $scope.locations = response.data;
                //console.log(response.data)
            })
        };

        var getTransmodeCode = function () {
            apiFactory.conductionType().then(function (response) {
                $scope.transmodeCodes = response.data;
                //console.log(response.data)
            })
        };

        getTransmodeCode();

        getLocation();


    }]);