import React from 'react';

import Bindable from './Bindable';
import Constants from '../commons/Constants';

export default class InputSelect extends Bindable {

  render() {

    let options = this.props.options.map((item) => {
        return <option key={item} value={item}>{item}</option>
    });

    return (
      <select className={"form-control input-"+this.props.size+" "+this.props.className}
          onChange={this.handleChange}
      >
        {options}
      </select>
    );
  }

}

InputSelect.defaultProps = Object.merge(Bindable.defaultProps,{
  options: [],
  size: "md",
  onSelect: () => {}
});

InputSelect.propTypes = Object.merge(Bindable.propTypes, {
   options: React.PropTypes.array.isRequired,
   size: React.PropTypes.oneOf(Constants.SIZES).isRequired,
   onSelect: React.PropTypes.func.isRequired
});
