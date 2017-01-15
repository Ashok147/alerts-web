'use strict';


// Declare app level module which depends on views, and components
var alertsModule = angular.module('alertsModule', [
    'ngMaterial',
    'ngMessages',
    'mdDataTable',
    'smart-table',
    'ngRoute',
    'ngMaterialDatePicker',
    'angularMoment'
]);

alertsModule.constant("alerturls", {
        "mainpath":"http://localhost:25916/services/alert",
        "create":"/create",
        "update":"/update",
        "pause":"/pause",
        "resume":"/resume",
        "list":"/list",
        "delete":"/delete",
        "createtag":"/tag/create",
        "tagslike":"/tag/tagslike",
        "alertanomaly":"http://localhost:25916/services/druid/data"
});

alertsModule.factory('AlertService',['alerturls','$http','$q',alertsService]);
alertsModule.factory('Toast',['$mdToast',createToastFactory]);

alertsModule.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');
  $routeProvider
      .when('/create', {
          templateUrl: 'templates/create.html', controller: 'AppCtrl'
      })
      .when('/list',{
          templateUrl:'templates/list2.html' ,controller:'listTwoCtrl'
      })
      .when('/data',{
          templateUrl:'templates/anomaly.html',controller:'anomalyDataController'
      })
      .otherwise({redirectTo: '/create'});

}]);

var appCtrl = alertsModule.controller('AppCtrl', AppCtrl);
var navCtrl = alertsModule.controller('NavCtrl', NavCtrl);
var listTwoCtrl = alertsModule.controller('listTwoCtrl',listTwoCtrl);
var anomalyDataController = alertsModule.controller('anomalyDataController',anomalyDataController);
