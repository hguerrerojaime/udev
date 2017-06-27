import React from 'react';
import ReactDI from 'react-di';
import LookupService from '../services/LookupService';
import RecordService from '../services/RecordService';

let dependencies = {
  lookupService: new LookupService(),
  recordService: new RecordService()
}

let resolver = new ReactDI(dependencies);

export default resolver;
