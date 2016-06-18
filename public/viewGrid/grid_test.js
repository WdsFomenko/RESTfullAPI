'use strict';

describe('myApp.viewGrid module', function() {

  beforeEach(module('myApp.viewGrid'));

  describe('viewGrid controller', function(){

    it('Контроллер viewGridCtr создан', inject(function($controller) {
      var viewGridCtrl = $controller('ViewGridCtrl');
      expect(viewGridCtrl).toBeDefined();
    }));

  });
});