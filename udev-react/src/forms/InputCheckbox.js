import React from 'react';
import Bindable from './Bindable';

export default class Checkbox extends Bindable {

  constructor(props) {
    super(props);

    this.elementId = String.random();
  }

  render() {
    return (
      <div className={"checkbox checkbox-"+this.props.brand} style={this.props.style}>
        <input id={this.elementId} type="checkbox" className="styled" defaultChecked={this.hasModel() ? this.binder.value : false}
         />
        <label htmlFor={this.elementId} onClick={this.handleChange.bind(this)}></label>
      </div>
    );
  }

  handleChange(evt) {

    if (this.hasModel()) {
      this.binder.value = !this.binder.value;
      this.props.onChange(this.binder.value);
    }
  }

}

Checkbox.defaultProps = Object.merge(Bindable.defaultProps,{
   brand: "default",
   style: {}
});
