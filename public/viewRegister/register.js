'use strict';

angular.module('myApp.viewRegister', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Register', {
    templateUrl: 'viewRegister/register.html',
    controller: 'ViewRegisterCtrl'
  });
}])

.controller('ViewRegisterCtrl', function($scope, $location, serviceMessage){

    });