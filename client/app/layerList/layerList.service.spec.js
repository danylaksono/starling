'use strict';

describe('Service: layerList', function() {
  // load the service's module
  beforeEach(module('starlingApp.layerList'));

  // instantiate service
  var layerList;
  beforeEach(inject(function(_layerList_) {
    layerList = _layerList_;
  }));

  it('should do something', function() {
    expect(!!layerList).to.be.true;
  });
});
