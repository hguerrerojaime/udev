import React from 'react';

import Bindable from './Bindable';
import FieldType from './FieldType';

export default class Field extends Bindable {

  constructor(props) {
    super(props);
  }

  render() {
    let fieldType = this.props.type;
    return fieldType.buildComponent(this.props);
  }

}
