'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './lombokdata.events';

mongoose.set('debug', false);

var LombokdataSchema = new mongoose.Schema({
  id_laporan: String,
  data: mongoose.Schema.Types.Mixed
});

registerEvents(LombokdataSchema);
export default mongoose.model('Lombokdata', LombokdataSchema);
