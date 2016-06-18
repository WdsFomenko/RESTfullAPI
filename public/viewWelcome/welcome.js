'use strict';

angular.module('myApp.viewWelcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Welcome', {
    templateUrl: 'viewWelcome/welcome.html',
    controller: 'ViewWelcomeCtrl'
  });
}])

.controller('ViewWelcomeCtrl', function($scope, $http){

    });