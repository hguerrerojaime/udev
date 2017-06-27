import React from 'react';
import Constants from '../commons/Constants';
import { Enum } from 'enumify';
import InputText from './InputText';
import InputLookup from './InputLookup';
import InputSelect from './InputSelect';
import InputDetail from './InputDetail';
import InputDate from './InputDate';
import InputCheckbox from './InputCheckbox';
import OutputLabel from './OutputLabel';

export default class FieldType extends Enum {}

function enumBody(defaultProps = {}, componentBuilder = (props)=>{}) {
  return {
    defaultProps: defaultProps,
    buildComponent: (props) => {
      return componentBuilder(Object.merge(defaultProps,props));
    }
  }
}

FieldType.initEnum({
  AUTO_NUMBER: enumBody({},(props) => {
      return <OutputLabel {...props} />;
  }),
  TEXT: enumBody({
    case: null
  },(props) => {
      return <InputText {...props} />;
  }),
  TEXT_AREA: enumBody({
    case: null
  },(props) => {
     return <InputText {...props} />;
  }),
  CHECKBOX: enumBody({},(props) => {
     return <InputCheckbox {...props} />
  }),
  RICH_TEXT: enumBody(),
  EMAIL: enumBody(),
  PHONE: enumBody(),
  NUMBER: enumBody({
    decimals: 0
  }),
  CURRENCY: enumBody(),
  DATE: enumBody({},(props) => {
    return <InputDate {...props} />;
  }),
  DATETIME: enumBody(),
  TIMESTAMP: enumBody(),
  SELECT: enumBody({},(props) => {
     return <InputSelect {...props} />;
  }),
  LOOKUP: enumBody({},(props) => {
     return <InputLookup {...props} />;
  }),
  DETAIL: enumBody({},(props) => {
    return <InputDetail {...props} />
  })
});
