'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.viewWelcome',
  'myApp.viewRegister',
  'myApp.viewLogin',
  'myApp.viewGridEdit',
  'myApp.viewGrid'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/Welcome'});

}]).
controller('appCtrl',function($scope, $location, $http, serviceMessage){
        // Объявление пространства имен контроллера
        $scope.appNs = {};

        /* Создание новых экземпляров оъектов:
            визуализации информацтонных сообщений,
            обеспечения взаимодейсствия с моделью данных,
            обеспечения взаимрдейсьвия с моделью пользователей,
            организации процесса перенаправления между страницами,
            обеспечения доступа к выбранной записи и дествий над ней
         */
        $scope.appNs.message = new MessageClass($scope);
        $scope.appNs.data = new DataClass($scope, $http, $location, serviceMessage);
        $scope.appNs.user = new UserClass($scope, $http, $location, serviceMessage);
        $scope.appNs.direct = new DirectClass($scope, $location);
        $scope.appNs.item = new ItemClass($scope);

        /* Объявление шаблонов для вспомогательных переменных приложения:
            текста информационого сообщения,
            текущих значений имени пользователя и статуса,
            формы редактирования данных выбранной записи и ее идентификатора,
            формы регистрации пользователя и контрольного пароля,
            формы авторизации пользователя,
         */
        $scope.appNs.messageResponse = "";

        $scope.appNs.currentUserName = "";
        $scope.appNs.currentUserStatus = "";

        $scope.appNs.curentCustomerInfo = {"_id":"", "name":"", "city":"", "phone":""};
        $scope.appNs.currentCustomerIdf = '';

        $scope.appNs.loginData = {"_id":"", "username":"", "password":"", "status":"user"};
        $scope.appNs.checkNewPassword  = '';

        $scope.appNs.authorisation = {"username":"", "password":""};

        // Инициалзация конфигурации доступа к удаленным БД
        $scope.appNs.data.dataInit();

        //Получение статуса и имени текущего пользователя приложения
        $scope.appNs.user.getCurrentUser();

        //Реализация перенаправления пользователя в зависимости от статуса доступа
        $scope.$watch('appNs.currentUserStatus ', function(value){
            switch(value){
                case 'guest':
                    $scope.appNs.direct.directWelcome();
                    break;
                case 'user':
                    $scope.appNs.direct.directGrid();
                    break;
                default:
                    break;
            }
        });

    }).
    factory('serviceMessage',function(){
        "use strict";
        return{
            showMessage:function(status, info, title){
                $('#messageResponseTitle').text(title);
                if(status){
                    $('#messageResponse').addClass('statusResponseSuccess').removeClass('statusResponseError');
                }else{
                    $('#messageResponse').addClass('statusResponseError').removeClass('statusResponseSuccess');
                }
                $('#messageResponseText').text(info);
                $('#messageResponse').toggle()
                    .animate({'opacity':'+=1'},100,'swing')
                    .delay(3000)
                    .animate({'opacity':'-=1'},1000,'swing', function(){
                      $('#messageResponse').toggle();
                });
            }
        }
    });



