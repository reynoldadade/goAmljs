'use strict';

angular.module('myApp.report', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/newReport', {
            templateUrl: 'views/report.html',
            controller: 'reportCtrl'
        })

    }])



.controller('reportCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory','$route','$q',function($scope,$rootScope,$sessionStorage,$location,apiFactory,$route,$q) {

    $rootScope.title = 'New Report';
    $sessionStorage.access = {};
    $scope.modalise = {'address':{}};
    $scope.report = {};
    $scope.modalise.address.title = 'Add New Location';
    $rootScope.userData = $sessionStorage.userData;
    $scope.t_address = {};
    $scope.action = $sessionStorage.action;
    console.log($sessionStorage.mainTree);





    var createReport = function (start) {

        var mainReport = {
            'rentity_id': $scope.report.rentity_id,
            'rentity_branch': $scope.report.rentity_branch,
            'submission_type_code': $scope.report.submission_code,
            'report_type_code': $scope.report.report_code,
            'entity_reference': $scope.report.entity_reference,
            'fiC_ref_number': $scope.report.fic_ref_number,
            'currency_code_local': $scope.report.currency_code_local,
            'reporting_person': $sessionStorage.userData.id,
            'userid': $sessionStorage.userData.id,
            'location': $scope.report.location,
            'action': $scope.report.action,
            'reason': $scope.report.reason,
            "isauthorized": false,
            "ispublished": false,
            "iscompleted": false,
            "isrejected": false,
            "report_Goods_Services": [],
            "report_Indicators": [],
            "report_Transaction": []
        };
        console.log(mainReport)
        apiFactory.reportMain(mainReport).then(function (response) {
            if (response.data){
                $scope.run = true;
                $sessionStorage.mainTree = response.data;
                $sessionStorage.action = {
                    message: 'Report Created Successfully',
                    success: true,
                    failure : false,
                    network: false
                };
                if(start === true){
                    $location.path('/addIndicators')
                }
                else if(start === false){
                    $route.reload()
                }
            }else{
                $sessionStorage.action = {
                    message: 'Report Creation Failed',
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
            $route.reload();
        })
    };

    $scope.createNewReport = function () {
        createReport(false);
    };

    $scope.createNewReportAndContinue = function () {
        createReport(true)
    };


    var saveLocation = function () {
        var location = {
            "address_type" : $scope.t_address.address_type,
            "address": $scope.t_address.address,
            "town": $scope.t_address.town,
            "city": $scope.t_address.city,
            "zip": $scope.t_address.zip,
            "country_code" : $scope.t_address.country_code,
            "state": $scope.t_address.state,
            "comments": $scope.t_address.comments
        };

        apiFactory.addTAddress(location).then(function (response) {
            if (response.data){

                $sessionStorage.action = {
                    message: 'Location Added Successfully',
                    success: true,
                    failure : false,
                    network: false
                };
                $scope.t_address = {};
                $scope.action = $sessionStorage.action;
                getLocation();
            }else{
                $sessionStorage.action = {
                    message: 'Failed to Add Location',
                    success: false,
                    failure : true,
                    network: false
                };
                $scope.action = $sessionStorage.action;
            }
        },function () {
            $sessionStorage.action = {
                message: 'Network Failure',
                success: false,
                failure : false,
                network: true
            };
            $scope.action = $sessionStorage.action;
        })
    };

    $scope.saveNewLocation = function () {
            saveLocation();
    };



    //setupfiles

    var getReportType = function () {
        apiFactory.reportType().then(function (response) {
            $scope.reportTypes = response.data;
            //console.log(response.data)
        })
    };

    var getCurrencyType = function () {
        apiFactory.currencyType().then(function (response) {
            $scope.currencyTypes = response.data;
            //console.log(response.data)
        })
    };

    var getLocation = function () {
        apiFactory.locationType().then(function (response) {
            $scope.locations = response.data;
            //console.log(response.data)
        })
    };

    var getContactType = function () {
        apiFactory.contactType().then(function (response) {
            $scope.contactTypes = response.data;
            //console.log(response.data)
        })
    };

    var getSubmissionType = function () {
        apiFactory.submissionType().then(function (response) {
            $scope.submissionTypes = response.data;
            //console.log(response.data)
        })
    };

    var getBranch = function () {
        apiFactory.entityBranch().then(function (response) {
            $scope.branches = response.data;
            //console.log(response.data)
        })
    };

    var getCountries = function () {
        apiFactory.getCountries().then(function (response) {
            $scope.countries = response.data;
            //console.log(response.data)
        })
    };

    getBranch();
    getReportType();
    getCurrencyType();
    getLocation();
    getContactType();
    getSubmissionType();
    getCountries();






}]);