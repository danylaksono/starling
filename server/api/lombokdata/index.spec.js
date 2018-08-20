'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var lombokdataCtrlStub = {
  index: 'lombokdataCtrl.index',
  show: 'lombokdataCtrl.show',
  create: 'lombokdataCtrl.create',
  upsert: 'lombokdataCtrl.upsert',
  patch: 'lombokdataCtrl.patch',
  destroy: 'lombokdataCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var lombokdataIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './lombokdata.controller': lombokdataCtrlStub
});

describe('Lombokdata API Router:', function() {
  it('should return an express router instance', function() {
    expect(lombokdataIndex).to.equal(routerStub);
  });

  describe('GET /api/lombokdatas', function() {
    it('should route to lombokdata.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'lombokdataCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lombokdatas/:id', function() {
    it('should route to lombokdata.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'lombokdataCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lombokdatas', function() {
    it('should route to lombokdata.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'lombokdataCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lombokdatas/:id', function() {
    it('should route to lombokdata.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'lombokdataCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lombokdatas/:id', function() {
    it('should route to lombokdata.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'lombokdataCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lombokdatas/:id', function() {
    it('should route to lombokdata.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'lombokdataCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
