'use strict';

describe('Component: AdminlteComponent', function() {
  // load the controller's module
  beforeEach(module('starlingApp.adminlte'));

  var AdminlteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AdminlteComponent = $componentController('adminlte', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
