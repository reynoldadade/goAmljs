'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.landing',
  'myApp.report',
  'myApp.addIndicators',
  'myApp.manageDraftReports',
  'myApp.manageUnauthorizedReports',
  'myApp.manageUnpublishedReports',
  'myApp.reportTransactions',
  'myApp.addParties',
  'myApp.dashboard',
  'myApp.register',
  'myApp.manageRejectedReports',
  'myApp.exportXMLFile',
  'ngStorage'




]);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


    $routeProvider.when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
    });



  $routeProvider.otherwise({redirectTo: '/'});
}]);
//navigation
app.directive('navDirective',function () {
    return {
        restrict: 'E',
        scope: {
            userData:'='
        },
        templateUrl: 'directives/nav.html',
        link: function(scope, element) {

        }
    }
});
//t_address
app.directive('addressDirective',function () {
    return {
        restrict: 'E',
        scope: {
            saveNewLocation : '=',
            contactTypes : '=',
            modalise: '=',
            action:'=',
            countries:'=',
            addresser:'='
        },
        templateUrl: 'directives/t_address.html',
        link: function(scope, element) {

        }
    }
});
//alert
app.directive('alertDirective', function() {
    return {
        restrict: 'E',
        scope: {
            action: '=',
            closeAlerts: '=',

        },
        templateUrl: 'directives/alerts.html',
        link: function(scope, element) {

        }
    }
});

app.directive('viewDirective', function() {
    return {
        restrict: 'E',
        scope: {
            action: '=',
            closeAlerts: '=',
            details:'=',
            view:'=',
            tasks:'=',
            pass:'=',
            approve:'=',
            reject:'=',
            publish:'='

        },
        templateUrl: 'directives/views.html',
        link: function(scope, element) {

        }
    }
});

app.directive('reportDirective', function() {
    return {
        restrict: 'E',
        scope: {
            countries: '=',
            funds:'=',
            party:'=',
            reportButtonTexts: '=',
            postReport: '=',
            states:'='

        },
        templateUrl: 'directives/reportForm.html',
        link: function(scope, element) {

        }
    }
});
app.directive('foreignCurrencyDirective', function() {
    return {
        restrict: 'E',
        scope: {
            submit: '=',
            foreignCurrency: '=',
            currencyTypes:"="

        },
        templateUrl: 'directives/foreignCurrency.html',
        link: function(scope, element) {

        }
    }
});

app.directive('entityDirective', function() {
    return {
        restrict: 'E',
        scope: {
            countries: '=',
            closeAlerts: '=',
            action: '=',
            modalise: '=',
            buttonText: "=",
            attachEntity:"=",
            entity:"=",
            notEntities:"=",
            notMyClient:'='
        },
        templateUrl: 'directives/entity.html',
        link: function(scope, element) {

        }
    }
});


app.directive('personDirective', function() {
    return {
        restrict: 'E',
        scope: {
            countries: '=',
            closeAlerts: '=',
            action: '=',
            modalise: '=',
            buttonText: "=",
            person: "=",
            genders:"=",
            attachPerson: '=',
            notPersons:'=',
            claim:'=',
            setSelected:'=',
            notMyClient:'='
        },
        templateUrl: 'directives/person.html',
        link: function(scope, element) {

        }
    }
});

app.directive('accountDirective', function() {
    return {
        restrict: 'E',
        scope: {
            countries: '=',
            closeAlerts: '=',
            action: '=',
            modalise: '=',
            statusCodes: '=',
            currencyTypes: '=',
            accountTypes: '=',
            branches:'=',
            buttonText: "=",
            attachAccount:'=',
            account:'=',
            notAccounts:'=',
            notMyClient:'='
        },
        templateUrl: 'directives/account.html',
        link: function(scope, element) {

        }
    }
});


app.filter('draftFilter', function(){
    return function (inputs) {
        var out = [];
        angular.forEach(inputs,function (input) {
            if( input.iscompleted === false ){
                out.push(input)
            }
        });
        return out;
    }
});

app.filter('authorizedFilter', function(){
    return function (inputs) {
        var out = [];
        angular.forEach(inputs,function (input) {
            if(input.iscompleted === true && input.isauthorized === false && input.isrejected === false  ){
                out.push(input)
            }
        });
        return out;
    }
});

app.filter('rejectedFilter', function(){
    return function (inputs) {
        var out = [];
        angular.forEach(inputs,function (input) {
            if(input.iscompleted === true && input.isauthorized === false && input.isrejected === true ){
                out.push(input)
            }
        });
        return out;
    }
});




app.filter('publishedFilter', function(){
    return function (inputs) {
        var out = [];
        angular.forEach(inputs,function (input) {
            if(input.iscompleted === true && input.isauthorized === true && input.ispublished === false){
                out.push(input)
            }
        });
        return out;
    }
});
