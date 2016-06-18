'use strict';

describe('myApp.viewWelcome module', function() {

  beforeEach(module('myApp.viewWelcome'));

  describe('viewWelcome controller', function(){

    it('Контроллер viewWelcomeCtr создан', inject(function($controller) {
      var viewWelcomeCtrl = $controller('ViewWelcomeCtrl');
      expect(viewWelcomeCtrl).toBeDefined();
    }));

  });
});