angular.module('myApp')

.factory('apiFactory',['$http','$httpParamSerializerJQLike','$sessionStorage', function($http,$httpParamSerializerJQLike,$sessionStorage){
    var baseUrl = 'http://goamlmiddlewareapi.azurewebsites.net';
    var apiFactory = {};


    apiFactory.reportMain = function (input) {
        return $http({
            method: 'POST',//or POST
            url: baseUrl+ '/api/ReportMain',
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };
    apiFactory.putMainTree = function (input,id) {
        return $http({
            method: 'PUT',//or POST
            url: baseUrl+ '/api/ReportMain/'+id,
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };


    apiFactory.putReportTree = function (input,id) {
        return $http({
            method: 'PUT',//or POST
            url: baseUrl+ '/api/ReportTransaction/'+id,
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };
    apiFactory.addTAddress = function (input) {
        return $http({
            method: 'POST',//or POST
            url: baseUrl+ '/api/ReportTAddress',
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    //setup files
    apiFactory.reportType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/ReportTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.entityBranch = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/ReportEntityBranch',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.genders = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/Genders',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.currencyType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/CurrencyTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.locationType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/ReportTAddress',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.contactType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/ContactTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.submissionType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/SubmissionTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.indicatorType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/IndicatorTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.conductionType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/conductionTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getCountries = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/Countries',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getAccountStatus = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/AccountStatus',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };
    apiFactory.getAccountType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/AccountTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getFundType = function () {
        return $http({
            method: 'GET',//or POST
            url: baseUrl+ '/api/FundsTypes',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postTransaction = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTransaction',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postAccountNotMyClient = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTAccount',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postAccountMyClient = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTAccountMyClient',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postPerson = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTPerson',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postEntityNotMyClient = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTEntity',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };


    apiFactory.postEntityMyClient = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTEntityMyClient',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postForeignCurrency = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTForeignCurrency',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postReportTFrom = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTFrom',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postReportTFromMyClient = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTFromMyClient',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.postReportTo = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTTo',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
                
            }
        });
    };

    apiFactory.postReportToMyClient = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/ReportTToMyClient',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.addIndicator = function (input) {
        return $http({
            method: 'POST',//or GET,
            data: input,
            url: baseUrl+ '/api/BulkReportIndicators',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getViews = function () {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/ReportViews',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getReportEntityMyClient = function () {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/ReportTEntityMyClient',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getReportEntityNotMyClient = function () {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/ReportTEntity',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getReportAccountMyClient = function () {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/ReportTAccountMyClient',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };
    apiFactory.getReportAccountNotMyClient = function () {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/ReportTAccount',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getReportPersonMyClient = function () {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/ReportTPerson',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.putUpdateViews = function (input,id) {
        return $http({
            method: 'PUT',//or POST
            url: baseUrl+ '/api/ReportViews/'+id,
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };


    //login and registration
    apiFactory.login = function (input) {
        return $http({
            method: 'POST',//or GET,
            url: baseUrl+ '/api/account/login',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: input
        });
    };


    apiFactory.register = function (input) {
        return $http({
            method: 'POST',//or GET,
            url: baseUrl+ '/api/account/register',
            data:input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };

    apiFactory.getUser = function (userName) {
        return $http({
            method: 'GET',//or GET,
            url: baseUrl+ '/api/account/UserInfo/'+ userName,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'bearer '+$sessionStorage.token
            }
        });
    };













    return apiFactory;

}]);