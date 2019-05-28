'use strict';

angular.module('myApp.addParties', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.when('/addParties', {
            templateUrl: 'views/addParties.html',
            controller: 'addPartiesCtrl'
        })

    }])



    .controller('addPartiesCtrl', ['$scope','$rootScope','$sessionStorage','$location','apiFactory',function($scope,$rootScope,$sessionStorage,$location,apiFactory) {

        $rootScope.title = 'Attach Parties From';
        $scope.action = $sessionStorage.action;
        $sessionStorage.access = {};
        $scope.mainTree = $sessionStorage.mainTree;
        $scope.reportTree = $sessionStorage.reportTree;
        $rootScope.userData = $sessionStorage.userData;
        //console.log($sessionStorage.mainTree, 'Main Tree Transactions');
        //console.log($sessionStorage.reportTree,'Report Tree Transactions')
        $scope.modalise = {'entity':{},'account':{},'person':{},pending:false,sent:false,failed:false};
        $scope.buttonTextClient = {entity: 'Entity - My Client', person:'Person - My Client', account:'Account - My Client'};
        $scope.buttonTextNotClient = {entity: 'Entity - Not My Client', person:'Person - Not My Client', account:'Account - Not My Client'};
        $scope.account = {};
        $scope.person = { notPer:{}};
        $scope.entity = {};
        $scope.transaction = {};
        $scope.foreignCurrency = {};
        $scope.modalise.entity.title = 'Add Entity';
        $scope.modalise.account.title = 'Add Account';
        $scope.modalise.person.title = 'Add Person';
        $scope.notMyClient = {};
        $scope.myClient = {};
        $scope.report = {};
        $scope.party = {};
        $scope.claim = {};
        $scope.reportButtonTexts = {fromMyClient: 'From My Client', from: 'From Not My Client', toMyClient:'To My Client' , to: 'To Not My Client'}
        $scope.states = {from:{pending:false,sent:false, failed:false},to:{pending:false,sent:false, failed:false}};
        $sessionStorage.myClient = {};
        $sessionStorage.notMyClient = {};





        var getCountries = function () {
            apiFactory.getCountries().then(function (response) {
                $scope.countries = response.data;
                //console.log(response.data)
            })
        };

        var getAccountStatus = function () {
            apiFactory.getAccountStatus().then(function (response) {
                $scope.statusCodes = response.data;
                //console.log(response.data)
            })
        };

        var getBranch = function () {
            apiFactory.entityBranch().then(function (response) {
                $scope.branches = response.data;
                //console.log(response.data)
            })
        };

        var getCurrencyType = function () {
            apiFactory.currencyType().then(function (response) {
                $scope.currencyTypes = response.data;
              //  console.log(response.data)
            })
        };

        var getAccountType = function () {
            apiFactory.getAccountType().then(function (response) {
                $scope.accountTypes = response.data;
                //console.log(response.data)
            })
        };

        var getGender = function () {
            apiFactory.genders().then(function (response) {
                $scope.genders = response.data;
                //console.log(response.data,'genders')
            })
        };

        var getFundType = function () {
            apiFactory.getFundType().then(function (response) {
                $scope.fundTypes = response.data;
               //console.log(response.data,'funds')
            })
        };

        var getReportEntity = function () {
            apiFactory.getReportEntityMyClient().then(function (response) {
                $scope.entities = response.data
            })
        };

        var getReportAccount = function () {
            apiFactory.getReportAccountMyClient().then(function (response) {
                $scope.accounts = response.data;
            })
        };

        var getReportPerson = function () {
            apiFactory.getReportPersonMyClient().then(function (response) {
                $scope.persons = response.data;
                $scope.notPersons = response.data;
            })
        };

        var getReportAccountNotMyClient = function () {
            apiFactory.getReportAccountNotMyClient().then(function (response) {
                $scope.notAccounts = response.data;
            })
        };

        var getReportEntityNotMyClient = function () {
            apiFactory.getReportEntityNotMyClient().then(function (response) {
                $scope.notEntities = response.data
            })
        };

        getCountries();
        getAccountStatus();
        getBranch();
        getCurrencyType();
        getAccountType();
        getGender();
        getFundType();
        getReportEntity();
        getReportAccount();
        getReportPerson();
        getReportAccountNotMyClient();
        getReportEntityNotMyClient();

        //ACCOUNT
        var postAccountNotMyClient = function () {
            var accountTree={

                "institution_name": $scope.account.institution_name,
                "institution_code": $scope.account.institution_code,
                "swift": $scope.account.swift,
                "non_bank_institution": $scope.account.non_bank_institution,
                "branch": $scope.account.branch,
                "account": $scope.account.account,
                "currency_code": $scope.account.currency_code,
                "iban": $scope.account.iban,
                "client_number": $scope.account.client_number,
                "person_account_type": $scope.account.person_account_type,
                "t_entity": $scope.account.t_entity,
                "opened": $scope.account.opened,
                "closed": $scope.account.closed,
                "balance": $scope.account.balance,
                "date_balance": $scope.account.date_balance,
                "status_code": $scope.account.status_code,
                "beneficiary": $scope.account.beneficiary,
                "beneficiary_comment": $scope.account.beneficiary_comment,
                "comments": $scope.account.comments
            };
            console.log(accountTree, 'accountTree');
            $scope.modalise.pending = true;
            apiFactory.postAccountNotMyClient(accountTree).then(function (response) {
                $scope.modalise.pending = false;
                console.log(response);
                if (response.data){
                    $scope.modalise.sent = true;
                    $scope.account = {};
                    $scope.notMyClient.account = response.data.id;
                    $sessionStorage.action = {
                        message: 'Account Not My Client Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                    $scope.action = $sessionStorage.action;
                    getReportAccountNotMyClient();
                }else{
                    $sessionStorage.action = {
                        message: 'Failed To Add Account Not My Client',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $scope.modalise.failed = true;
                    $scope.action = $sessionStorage.action;
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : true,
                    network: false
                };
                $scope.account = {};
                $scope.action = $sessionStorage.action;
                $scope.modalise.failed = true;
            })

        };

        //PERSON
        var postPerson = function () {
            var personTree = {
                "gender": $scope.person.gender,
                "title": $scope.person.title,
                "first_name": $scope.person.first_name,
                "middle_name": $scope.person.middle_name,
                "prefix": $scope.person.prefix,
                "last_name": $scope.person.last_name,
                "birthdate": $scope.person.birthdate,
                "birth_place":$scope.person.birth_place ,
                "mothers_name": $scope.person.mothers_name,
                "alias": $scope.person.alias,
                "ssn": $scope.person.ssn,
                "passport_number": $scope.person.passport_number,
                "passport_country": $scope.person.passport_country,
                "id_number": $scope.person.id_number,
                "nationality1": $scope.person.nationality1,
                "nationality2": $scope.person.nationality2,
                "nationality3": $scope.person.nationality3,
                "residence": $scope.person.residence,
                "email": $scope.person.email,
                "occupation": $scope.person.occupation,
                "employee_name": $scope.person.employee_name,
                "employee_address_id": $scope.person.employee_address_id,
                "employee_phone_id": $scope.person.employee_phone_id,
                "deceased": $scope.person.deceased,
                "deceased_date": $scope.person.deceased_date,
                "tax_number": $scope.person.tax_number,
                "tax_reg_number": $scope.person.tax_reg_number,
                "source_of_wealth": $scope.person.source_of_wealth,
                "comments":$scope.person.comments
            };
            console.log(personTree,'person Tree');
            $scope.modalise.pending = true;

            apiFactory.postPerson(personTree).then(function (response) {
                console.log(response);
                //$scope.person = {};
                $scope.modalise.pending = false;
                if (response.data){
                    $scope.notMyClient.person = response.data.id;
                    $scope.myClient.person = response.data.id;
                    $sessionStorage.action = {
                        message: 'Person Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                    $scope.modalise.sent = true;
                    $scope.action = $sessionStorage.action;
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add Person',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $scope.modalise.failed = true;
                    $scope.action = $sessionStorage.action;
                    getReportPerson();
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
                $scope.action = $sessionStorage.action;
                $scope.person = {};
                $scope.modalise.failed = true;
            })
        };

        //ENTITY
        var postEntityNotMyClient = function () {
           var entityTree= {
                "reportid": $scope.entity.reportid,
                "name": $scope.entity.name,
                "commercial_name": $scope.entity.commercial_name,
                "incorporation_legal_form": $scope.entity.incorporation_legal_form,
                "fincorporation_number": $scope.entity.fincorporation_number,
                "business": $scope.entity.business,
                "phone": $scope.entity.phone,
                "address": $scope.entity.address,
                "email": $scope.entity.email,
                "url": $scope.entity.url,
                "incorporation_state": $scope.entity.incorporation_state,
                "incorporation_country_code": $scope.entity.incorporation_country_code,
                "director_id": $scope.entity.director_id,
                "incorporation_date": $scope.entity.incorporation_date,
                "business_closed": $scope.entity.business_closed,
                "date_business_closed": $scope.entity.date_business_closed,
                "tax_number": $scope.entity.tax_number,
                "tax_registration_number": $scope.entity.tax_registration_number,
                "comments": $scope.entity.comments
           };
           console.log(entityTree);
            $scope.modalise.pending = true;
                apiFactory.postEntityNotMyClient(entityTree).then(function (response) {
                    $scope.modalise.pending = false;
                    $scope.entity = {};
                    if (response.data){
                        $scope.modalise.sent = true;
                        $scope.notMyClient.entity = response.data;
                        $sessionStorage.action = {
                            message: 'Entity Added Successfully',
                            success: true,
                            failure : false,
                            network: false
                        };
                        $scope.action = $sessionStorage.action;
                        getReportEntityNotMyClient();
                    }else{
                        $sessionStorage.action = {
                            message: 'Failed to Add Entity',
                            success: false,
                            failure : true,
                            network: false
                        };
                        $scope.action = $sessionStorage.action
                        $scope.modalise.failed = true;
                    }
                },function () {
                    $sessionStorage.action = {
                        message: 'Network Error',
                        success: false,
                        failure : false,
                        network: true
                    };
                    $scope.entity = {};
                    $scope.action = $sessionStorage.action
                    $scope.modalise.failed = true;
                })
        };

        //POST FOREIGN CURRENCY
        var postForeignCurrency = function ()  {
            var foreignCurrencyTree = {
                "foreign_currency_code": $scope.foreignCurrency.foreign_currency_code,
                "foreign_amount": $scope.foreignCurrency.foreign_amount,
                "foreign_exchange_Rate": $scope.foreignCurrency.foreign_exchange_Rate
            };
            apiFactory.postForeignCurrency(foreignCurrencyTree).then(function (response) {
                console.log(response);
                if (response.data){
                   $scope.report.foreign_currency = response.data.id;
                    $sessionStorage.action = {
                        message: 'Foreign Currency Added Successfully',
                        success: true,
                        failure : false,
                        network: true
                    };
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add Foreign Currency',
                        success: false,
                        failure : true,
                        network: true
                    };
                }
            })
        };

        //report-parties
        var postReportFrom = function () {
                var fromReportTree =   {

                "to_funds_code":$scope.report.funds_code ,
                "to_funds_comments":$scope.report.funds_comments ,
                "to_foreign_currency": $scope.report.foreign_currency,
                "t_conductor": $sessionStorage.userData.id,
                "to_account": $scope.notMyClient.account,
                "to_person": $scope.notMyClient.person,
                "to_entity": $scope.notMyClient.entity,
                "to_country":$scope.report.from_country
            };
                console.log(fromReportTree)
            apiFactory.postReportTFrom(fromReportTree).then(function (response) {
                if (response.data){
                    $sessionStorage.notMyClient.from = response.data.id;
                    $sessionStorage.action = {
                        message: 'From Party Transaction Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add From Party Transaction',
                        success: false,
                        failure : true,
                        network: false
                    };
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Failure',
                    success: false,
                    failure : false,
                    network: true
                };
            })
};
        var postReportFromMyClient = function () {
            var fromReportTree =   {

                "from_funds_code":$scope.report.funds_code ,
                "from_funds_comments":$scope.report.funds_comments ,
                "from_foreign_currency": $scope.report.foreign_currency,
                "t_conductor": $sessionStorage.userData.id,
                "from_account": $scope.myClient.account,
                "from_person": $scope.myClient.person,
                "from_entity": $scope.myClient.entity,
                "from_country":$scope.report.country
            };
            apiFactory.postReportTFromMyClient(fromReportTree).then(function (response) {
                if (response.data){
                    $scope.report = {};
                    $sessionStorage.myClient.from = response.data.id;
                    console.log(response.data, 'fromReportMyClient');
                    $sessionStorage.action = {
                        message: 'From Party My Client Transaction Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add From Party Transaction',
                        success: false,
                        failure : true,
                        network: false
                    };
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
            })
        };
        var postReportTo = function () {
            var toReportTree =   {

                "to_funds_code":$scope.report.funds_code ,
                "to_funds_comments":$scope.report.funds_comments ,
                "to_foreign_currency": $scope.report.foreign_currency,
                "t_conductor": $sessionStorage.userData.id,
                "to_account": $scope.notMyClient.account,
                "to_person": $scope.notMyClient.person,
                "to_entity": $scope.notMyClient.entity,
                "to_country":$scope.report.country
            };
            apiFactory.postReportTo(toReportTree).then(function (response) {
                if (response.data){
                    $sessionStorage.notMyClient.to = response.data.id;

                    $sessionStorage.action = {
                        message: 'To Party Transaction Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add To Party  Transaction',
                        success: false,
                        failure : true,
                        network: false
                    };
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
            })
        };

        var postReportToMyClient = function () {
            var toReportTree =   {

                "to_funds_code":$scope.report.funds_code ,
                "to_funds_comments":$scope.report.funds_comments ,
                "to_foreign_currency": $scope.report.foreign_currency,
                "t_conductor": $sessionStorage.userData.id,
                "to_account": $scope.myClient.account,
                "to_person": $scope.myClient.person,
                "to_entity": $scope.myClient.entity,
                "to_country":$scope.report.country
            };
            console.log(toReportTree, 'tosentdata')
            apiFactory.postReportToMyClient(toReportTree).then(function (response) {
                if (response.data){
                    console.log(response.data, 'reportToMyClient')
                    $scope.report = {};
                    $sessionStorage.myClient.to = response.data.id;

                    $sessionStorage.action = {
                        message: 'To Party Transaction Added Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                    $scope.action = $sessionStorage.action
                }else{
                    $sessionStorage.action = {
                        message: 'Failed to Add To Party  Transaction',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $scope.action = $sessionStorage.action
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
                $scope.action = $sessionStorage.action
            })
        };



        $scope.attachAccountNotMyClient = function () {
            postAccountNotMyClient();
        };

        $scope.attachEntityNotMyClient  = function () {
            postEntityNotMyClient()
        };

        $scope.attachPerson = function () {
            postPerson();
        };

        /////////////////////////////////////////////////////////

        $scope.attachFrom = function () {
                postReportFrom();
        };

        $scope.attachFromMyClient = function () {
                postReportFromMyClient();
        };

        $scope.attachTo = function () {
            postReportTo()
        };

        $scope.attachToMyClient = function () {
            postReportToMyClient()
        };


        var attachParties = function (run) {
            $scope.reportTree.bi_from_my_client = $sessionStorage.myClient.from;
            $scope.reportTree.bi_from_not_my_client = $sessionStorage.notMyClient.from;
            $scope.reportTree.bi_to_my_client = $sessionStorage.myClient.to;
            $scope.reportTree.bi_to_not_my_client = $sessionStorage.notMyClient.to;

            apiFactory.putReportTree($scope.reportTree, $scope.reportTree.id).then(function (response) {
                if(response.statusText === 'OK'){
                    $sessionStorage.action = {
                        message: 'Report Successfully Completed and Uploaded',
                        success: true,
                        failure : false,
                        network: false
                    };

                    if (run === true){
                        $location.path('/reportTransactions')
                    }else{
                        $location.path('/newReport')
                    }
                }else{
                    $sessionStorage.action = {
                        message: 'Report Completion failed',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $route.reload();
                }
            },function () {
                $sessionStorage.action = {
                    message: 'Network Error -- Try Again',
                    success: false,
                    failure : false,
                    network: true
                };
            })
        };


        $scope.reRun = function(){
            attachParties(true)
        };
        $scope.complete = function(){
            attachParties(false)
        };


    }]);