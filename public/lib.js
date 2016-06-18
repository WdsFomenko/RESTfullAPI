'use strict';
//Библиотека классов приложения

/**
 * Класс методов перенаправления между страницами
 * @constructor
 * @param {Object} $scope - область видимости контроллера
 * @param {Object} $location - сервис переадресации
*/
function DirectClass($scope, $location){
    /**
     * Метод перенаправления на страницу приветствия
    */
  this.directWelcome = function(){
    $location.path('/Welcome');
  };

    /**
     * Метод перенаправления на страницу приветствия
    */
  this.directRegister = function(){
    $location.path('/Register');
  };

    /**
     * Метод перенаправления на страницу входа
    */
  this.directLogin = function(){
    $location.path('/Login');
  };

    /**
     * Метод перенаправления на страницу демонтрации данных
    */
  this.directGrid = function(){
    $location.path('/Grid');
  };

    /**
     * Метод перенаправления на страницу редактирования и добавления записей данных
    */
  this.directGridEdit = function(){
    $location.path('/Edit');
  };
}

/**
 * Класс методов обеспечения доступа к выбранной записи и дествий над ней
 * @constructor
 * @param {Object} $scope - область видимости контроллера
*/
function ItemClass($scope){
    /**
     * Метод сброса идентификаторов выбранной записи
    */
    this.resetSelectItem = function(){
        $scope.appNs.currentCustomerIdf = "";
        $scope.appNs.curentCustomerInfo = {};
    };

    /**
     * Метод инициализации записи для редактирования, удаления
     * @param {string} idf - идентификатор выбранной записи
     * @param {Object} info - коллекция данных выбранной записи
    */
    this.selectItem = function(idf, info){
        $scope.appNs.currentCustomerIdf = idf;
        $scope.appNs.curentCustomerInfo = info;
    };
}

/**
 * Класс методов визуализации информацтонных сообщений
 * @constructor
 * @param {Object} $scope - область видимости контроллера
*/
function MessageClass($scope){
    /**
     * Метод визуализации информационного сообщения
     * @param {boolean} status - успешное/ошибочное сообщение
     * @param {string} info - текст информационного сообщения
    */
    this.showMessage = function(status, info){
        if(status){
            $('#messageResponse').addClass('statusResponseSuccess').removeClass('statusResponseError');
        }else{
            $('#messageResponse').addClass('statusResponseError').removeClass('statusResponseSuccess');
        }
        $scope.appNs.messageResponse = info;
        $('#messageResponse').toggle()
            .animate({'opacity':'+=1'},100,'swing')
            .delay(3000)
            .animate({'opacity':'-=1'},1000,'swing', function(){
              $('#messageResponse').toggle();
        });
    };
}

/**
 * Класс методов обеспечения взаимрдейсьвия с моделью пользователей
 * @constructor
 * @param {Object} $scope - область видимости контроллера
 * @param {Object} $http - сервис AJAX функциональности
 * @param {Object} $location - сервис переадресации
 * @param {Object} serviceMessage - кастомный сервис информационных оповещений приложения
*/
function UserClass($scope, $http, $location, serviceMessage){
    /**
     * Метод проверки существования введенной комбинации логина и пароля
    */
    this.checkPassword = function(){
        var stringUrl = 'http://'+ $scope.appNs.configDbUsers.dbHost + ':' + $scope.appNs.configDbUsers.dbPort + '/' + $scope.appNs.configDbUsers.dbName;
        $http.get(stringUrl)
            .success(function(data) {
                $scope.appNs.dataDBUsers  = data;
                for(var cnt = 0; cnt< $scope.appNs.dataDBUsers.length; cnt++){
                    if(($scope.appNs.authorisation.username === $scope.appNs.dataDBUsers[cnt].username)&&
                        ($scope.appNs.authorisation.password === $scope.appNs.dataDBUsers[cnt].password)){

                        serviceMessage.showMessage(true, 'Добро пожаловать  в GRUD application!', 'Успешная авторизации');

                        $scope.appNs.currentUserName = $scope.appNs.dataDBUsers[cnt].username ;
                        $scope.appNs.currentUserStatus =  $scope.appNs.dataDBUsers[cnt].status;

                        sessionStorage.setItem('currentUserName', $scope.appNs.dataDBUsers[cnt].username);
                        sessionStorage.setItem('currentUserStatus', $scope.appNs.dataDBUsers[cnt].status);
                        break;
                    }else{
                        if( cnt === ($scope.appNs.dataDBUsers.length - 1) ){
                            serviceMessage.showMessage(false, 'Логин или пароль введены не верно!', 'Ошибка авторизации');

                            $scope.appNs.currentUserName = 'guest' ;
                            $scope.appNs.currentUserStatus =  'guest';

                            sessionStorage.setItem('currentUserName', 'guest');
                            sessionStorage.setItem('currentUserStatus', 'guest');
                        }
                    }
                }
            }).error(function(err) {
                serviceMessage.showMessage(false, 'Невозможно загрузить базу данных пользователей!', 'Ошибка удаленного доступа');
            });
    };

    /**
     * Метод перенапралнения неавторизованного пользователя на страницу приветсвия
    */
    this.testUserPermission = function(){
      if($scope.appNs.currentUserStatus !== 'user'){
        $location.path('/Welcome');
      }
    };

    /**
     * Метод сброса статуса и имени текущего пользователя
    */
    this.clearCurentUser = function(){
        $scope.appNs.currentUserName = 'guest' ;
        $scope.appNs.currentUserStatus =  'guest';
        $scope.appNs.authorisation = {"username":"", "password":""};

        sessionStorage.setItem('currentUserName', 'guest');
        sessionStorage.setItem('currentUserStatus', 'guest');
    };

    /**
     * Метод проверки соответсвия пароля и его подтверждения
     * @param {string} param - пароль
     * @param {string} confirmParam - подтверждене пароля
     * @return {boolean} - результирующий статус соответствия
    */
    this.checkNewPassword = function(param, confirmParam){
        if(param === confirmParam){
            return true;
        }
        serviceMessage.showMessage(false, 'Введенные пароли не совпадают!', 'Ошибка регистрации');
        return false;
    };

    /**
     * Метод регистрации пользователя в базе данных
    */
    this.setDbUsers = function() {
            var stringUrl = 'http://' + $scope.appNs.configDbUsers.dbHost + ':' + $scope.appNs.configDbUsers.dbPort + '/' + $scope.appNs.configDbUsers.dbName;
            var method = 'POST';
            var req = {
                method: method,
                url: stringUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.appNs.loginData
            };
            $http(req)
                .success(function(customers) {

                }).error(function(err) {
                    serviceMessage.showMessage(false, 'Изменения в базу данных пользователей не внесены!', 'Ошибка удаленного доступа');
                });
            this.setCurrentUser();
        };

    /**
     * Метод регистрации пользователя в базе данных
    */
    this.getDbUsers = function(){
        var stringUrl = 'http://'+ $scope.appNs.configDbUsers.dbHost + ':' + $scope.appNs.configDbUsers.dbPort + '/' + $scope.appNs.configDbUsers.dbName;
        $http.get(stringUrl)
            .success(function(data) {
                $scope.appNs.dataDBUsers  = data;
            }).error(function(err) {
                serviceMessage.showMessage(false, 'База данных пользователей не загружена!', 'Ошибка удаленного доступа');
            });
    };

    /**
     * Метод сброса шаблона выбранной записи в таблице
    */
    this.clearCurrentCustomer = function(){
        $scope.appNs.currentCustomerIdf = '';
        $scope.appNs.curentCustomerInfo = {"_id":"", "name":"", "city":"", "phone":""};
    };

    /**
     * Метод получения сессионого значения имени и статуса текущего пользователя
    */
    this.getCurrentUser = function(){
        var sessionCurrentUser = sessionStorage.getItem('currentUserName');
        var sessionCurrentStatus = sessionStorage.getItem('currentUserStatus');
        if(sessionCurrentUser === null){
            $scope.appNs.currentUserName = "guest";
            $scope.appNs.currentUserStatus = "guest";

        }else{
            $scope.appNs.currentUserName = sessionCurrentUser;
            $scope.appNs.currentUserStatus = sessionCurrentStatus;
        }
    };

    /**
     * Метод установки сессионого значения имени и статуса текущего пользователя
    */
    this.setCurrentUser = function(){
        $scope.appNs.currentUserName = $scope.appNs.loginData.username ;
        $scope.appNs.currentUserStatus =  $scope.appNs.loginData.status;

        sessionStorage.setItem('currentUserName', $scope.appNs.loginData.username);
        sessionStorage.setItem('currentUserStatus', $scope.appNs.loginData.status);
    };


}

/**
 * Класс методов обеспечения взаимодейсствия с моделью данных
 * @constructor
 * @param {Object} $scope - область видимости контроллера
 * @param {Object} $http - сервис AJAX функциональности
 * @param {Object} $location - сервис переадресации
 * @param {Object} serviceMessage - кастомный сервис информационных оповещений приложения
*/
function DataClass($scope, $http, $location, serviceMessage){
    /**
     * Метод инициалзации конфигурации доступа к удаленным БД по конфигурациооным файлам
    */
    this.dataInit = function(){
      $http.get('configDbUsers.json')
          .success(function(data) {

              $scope.appNs.configDbUsers = data;
          }).error(function(err) {
              serviceMessage.showMessage(false, 'Файл конфигурации не загружен!', 'Ошибка начальной конфигурации');
          });
      $http.get('configDbCustomers.json')
          .success(function(data) {
              $scope.appNs.configDbCustomers = data;
          }).error(function(err) {
              serviceMessage.showMessage(false, 'Файл конфигурации не загружен!', 'Ошибка начальной конфигурации');
          });
    };

    /**
     * Метод получения коллекции записей пользователей изи удаленной БД
    */
    this.getDbCustomers = function(){
        var stringUrl = 'http://'+ $scope.appNs.configDbCustomers.dbHost + ':' + $scope.appNs.configDbCustomers.dbPort + '/' + $scope.appNs.configDbCustomers.dbName;
        $http.get(stringUrl)
            .success(function(data) {
                $scope.appNs.dataDbCustomers = data;
            }).error(function(err) {
                serviceMessage.showMessage(false, 'База данных посетителей не загружена!', 'Ошибка удаленного доступа');
            });
    };

    /**
     * Метод удаления выбранной записи из коллекции в удаленной БД
    */
    this.deleteDbCustomers = function(){
        var stringUrl = 'http://'+ $scope.appNs.configDbCustomers.dbHost + ':' + $scope.appNs.configDbCustomers.dbPort + '/' + $scope.appNs.configDbCustomers.dbName + '/' + $scope.appNs.currentCustomerIdf;
        var req = {
          method: 'DELETE',
          url: stringUrl
        };
        $http(req)
            .success(function(customers) {
                for(var cnt = 0; cnt < $scope.appNs.dataDbCustomers.length; cnt++){
                    if($scope.appNs.dataDbCustomers[cnt]._id === $scope.appNs.currentCustomerIdf){
                        $scope.appNs.dataDbCustomers.splice(cnt,1)
                    }
                }
            }).error(function(err) {
                serviceMessage.showMessage(false, 'Данные выбранного пользователя не удалены!', 'Ошибка удаленного доступа');
            });
        $scope.appNs.data.getDbCustomers();
    };

    /**
     * Метод редактирования новой записи в коллекции удаленной БД
    */
    this.setDbCustomers = function() {
        var stringUrl = 'http://' + $scope.appNs.configDbCustomers.dbHost + ':' + $scope.appNs.configDbCustomers.dbPort + '/' + $scope.appNs.configDbCustomers.dbName + '/' + $scope.appNs.currentCustomerIdf;
        var method = 'PUT';
        var req = {
            method: method,
            url: stringUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.appNs.curentCustomerInfo
        };
        $http(req)
            .success(function(customers) {
                $location.path('/Grid');
            }).error(function(err) {
                serviceMessage.showMessage(false, 'Данные выбранного пользователя не внесены!', 'Ошибка удаленного доступа');
            });
    };


    /**
     * Метод добавления новой записи в коллекцию удаленной БД
    */
    this.addDbCustomers = function() {
        var stringUrl = 'http://' + $scope.appNs.configDbCustomers.dbHost + ':' + $scope.appNs.configDbCustomers.dbPort + '/' + $scope.appNs.configDbCustomers.dbName;
        var method = 'POST';
        var req = {
            method: method,
            url: stringUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.appNs.curentCustomerInfo
        };
        $http(req)
            .success(function(customers) {
                $location.path('/Grid');
            }).error(function(err) {
                serviceMessage.showMessage(false, 'Данные выбранного пользователя не внесены!', 'Ошибка удаленного доступа');
            });
    };
}




