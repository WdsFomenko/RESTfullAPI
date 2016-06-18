'use strict';

describe('myApp.viewRegister module', function() {

  beforeEach(module('myApp.viewRegister'));

  describe('viewRegister controller', function(){

    it('Контроллер viewRegisterCtr создан', inject(function($controller) {
      var viewRegisterCtrl = $controller('ViewRegisterCtrl');
      expect(viewRegisterCtrl).toBeDefined();
    }));

  });
});