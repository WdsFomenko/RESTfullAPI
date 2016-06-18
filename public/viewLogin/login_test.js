'use strict';

describe('myApp.viewLogin module', function() {

  beforeEach(module('myApp.viewLogin'));

  describe('viewLogin controller', function(){

    it('Контроллер viewLoginCtr создан', inject(function($controller) {
      var viewLoginCtrl = $controller('ViewLoginCtrl');
      expect(viewLoginCtrl).toBeDefined();
    }));

  });
});