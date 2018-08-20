/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lombokdatas              ->  index
 * POST    /api/lombokdatas              ->  create
 * GET     /api/lombokdatas/:id          ->  show
 * PUT     /api/lombokdatas/:id          ->  upsert
 * PATCH   /api/lombokdatas/:id          ->  patch
 * DELETE  /api/lombokdatas/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Lombokdata from './lombokdata.model';
import request from 'request';


//console.log('masuk server lur!');

function getDataFromApi() {
  var data = {}
  var options = {
    url: 'http://bangunan.wg.ugm.ac.id/index.php/api/evaluasi',
    method: 'GET',
    headers: {
      'X-API-KEY': '51e75edc86a36eb93be8e27b3c8d17a9',
      'Accept': 'json'
    }
  };

  // Erase all
  Lombokdata.remove({}, function(err, dat){
    if (err){
      console.log(err)
    } else {
      console.log('success delete');
    }

  }); 

  request(options, function (err, res, body) {
    data = JSON.parse(body).data;
    for (var i = 0; i < data.length; i++) {
      Lombokdata.create({"id_laporan":data[i].id, "data":data[i]});
    };
  });
}; //getdatafromapi
      

    

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Lombokdatas ==from API==
export function index(req, res) {
  
  return Lombokdata.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Lombokdata from the DB
export function show(req, res) {
  return Lombokdata.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Lombokdata in the DB
export function create(req, res) {
  getDataFromApi();
  return Lombokdata.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Lombokdata in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Lombokdata.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Lombokdata in the DB
export function patch(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Lombokdata.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Lombokdata from the DB
export function destroy(req, res) {
  return Lombokdata.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
