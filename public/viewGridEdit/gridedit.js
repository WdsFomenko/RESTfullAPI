'use strict';

angular.module('myApp.viewGridEdit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Edit', {
    templateUrl: 'viewGridEdit/gridedit.html',
    controller: 'ViewGridEditCtrl'
  });
}])

.controller('ViewGridEditCtrl', function($scope){
    $scope.appNs.user.testUserPermission();
});