'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newLombokdata;

describe('Lombokdata API:', function() {
  describe('GET /api/lombokdatas', function() {
    var lombokdatas;

    beforeEach(function(done) {
      request(app)
        .get('/api/lombokdatas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lombokdatas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(lombokdatas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lombokdatas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lombokdatas')
        .send({
          name: 'New Lombokdata',
          info: 'This is the brand new lombokdata!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLombokdata = res.body;
          done();
        });
    });

    it('should respond with the newly created lombokdata', function() {
      expect(newLombokdata.name).to.equal('New Lombokdata');
      expect(newLombokdata.info).to.equal('This is the brand new lombokdata!!!');
    });
  });

  describe('GET /api/lombokdatas/:id', function() {
    var lombokdata;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lombokdatas/${newLombokdata._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lombokdata = res.body;
          done();
        });
    });

    afterEach(function() {
      lombokdata = {};
    });

    it('should respond with the requested lombokdata', function() {
      expect(lombokdata.name).to.equal('New Lombokdata');
      expect(lombokdata.info).to.equal('This is the brand new lombokdata!!!');
    });
  });

  describe('PUT /api/lombokdatas/:id', function() {
    var updatedLombokdata;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lombokdatas/${newLombokdata._id}`)
        .send({
          name: 'Updated Lombokdata',
          info: 'This is the updated lombokdata!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLombokdata = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLombokdata = {};
    });

    it('should respond with the updated lombokdata', function() {
      expect(updatedLombokdata.name).to.equal('Updated Lombokdata');
      expect(updatedLombokdata.info).to.equal('This is the updated lombokdata!!!');
    });

    it('should respond with the updated lombokdata on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lombokdatas/${newLombokdata._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let lombokdata = res.body;

          expect(lombokdata.name).to.equal('Updated Lombokdata');
          expect(lombokdata.info).to.equal('This is the updated lombokdata!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lombokdatas/:id', function() {
    var patchedLombokdata;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lombokdatas/${newLombokdata._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Lombokdata' },
          { op: 'replace', path: '/info', value: 'This is the patched lombokdata!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLombokdata = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLombokdata = {};
    });

    it('should respond with the patched lombokdata', function() {
      expect(patchedLombokdata.name).to.equal('Patched Lombokdata');
      expect(patchedLombokdata.info).to.equal('This is the patched lombokdata!!!');
    });
  });

  describe('DELETE /api/lombokdatas/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lombokdatas/${newLombokdata._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when lombokdata does not exist', function(done) {
      request(app)
        .delete(`/api/lombokdatas/${newLombokdata._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
