import React from 'react';
import Bindable from './Bindable';
import Constants from '../commons/Constants';

export default class InputText extends Bindable {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <input type="text"
          ref={(nativeInput) => this.nativeInput = nativeInput}
          className={"form-control input-"+this.props.size+" "+this.props.className}
          onChange={ this.handleChange }
          value={ this.getValue() }
          onBlur={ this.props.onBlur }
          placeholder={ this.props.placeholder }
          onKeyPress={ this.props.onKeyPress }
      />
    );
  }

  componentDidMount() {
    this.configTextCase(this.getValue());
  }

  handleChange(evt) {
      this.configTextCase(evt.target.value);
      super.handleChange(evt);
  }

  configTextCase(value) {

    if (value) {
      if (this.props.case == "upper") {
         this.setValue(value.toUpperCase());
      } else if (this.props.case == "lower") {
         vthis.setValue(value.toLowerCase());
      }
    }
  }

  focus() {
    $(this.nativeInput).focus();
  }

  select() {
    $(this.nativeInput).select();
  }

  getInitialValue() {
    return "";
  }

}

InputText.defaultProps = Object.merge(Bindable.defaultProps,{
   size: "md",
   case: null,
   placeholder:null,
   onBlur: (evt) => {},
   onKeyPress: (evt) => {},
   onKeyUp: (evt) => {},
   onKeyDown: (evt) => {}
});

InputText.propTypes = Object.merge(Bindable.propTypes, {
   size: React.PropTypes.oneOf(Constants.SIZES).isRequired,
   case: React.PropTypes.oneOf(Constants.TEXT_CASES),
   onBlur: React.PropTypes.func.isRequired,
   onKeyPress: React.PropTypes.func.isRequired
});
