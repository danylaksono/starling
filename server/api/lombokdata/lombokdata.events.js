/**
 * Lombokdata model events
 */

'use strict';

import {EventEmitter} from 'events';
var LombokdataEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LombokdataEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Lombokdata) {
  for(var e in events) {
    let event = events[e];
    Lombokdata.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    LombokdataEvents.emit(event + ':' + doc._id, doc);
    LombokdataEvents.emit(event, doc);
  };
}

export {registerEvents};
export default LombokdataEvents;
