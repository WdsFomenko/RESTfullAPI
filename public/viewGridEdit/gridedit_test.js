'use strict';

describe('myApp.viewGridEdit module', function() {

  beforeEach(module('myApp.viewGridEdit'));

  describe('viewGridEdit controller', function(){

    it('Контроллер viewGridEditCtr создан', inject(function($controller) {
      var viewGridEditCtrl = $controller('ViewGridEditCtrl');
      expect(viewGridEditCtrl).toBeDefined();
    }));

  });
});