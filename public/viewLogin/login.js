'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Login', {
    templateUrl: 'viewLogin/login.html',
    controller: 'ViewLoginCtrl'
  });
}])

.controller('ViewLoginCtrl', [function() {

}]);