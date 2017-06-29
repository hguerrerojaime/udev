import React from 'react';
import Bindable from './Bindable';
import $ from 'jquery';
import 'bootstrap-datepicker';
import InputGroup from './InputGroup';
import InputGroupAddon from './InputGroupAddon';
import InputText from './InputText';
import Icon from '../commons/Icon';

//import '!style-loader!css-loader!bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';

export default class InputDate extends Bindable {

  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className="input-group date" ref={(input) => this.input = input}>
           <InputText />
          <InputGroupAddon>
            <Icon name="fa fa-calendar" />
          </InputGroupAddon>
        </div>
    );
  }

  componentDidMount() {

      $(this.input).datepicker({
          clearBtn: true,
          autoclose: true,
          orientation: "bottom auto",
          todayHighlight: true
      }).on('changeDate',(evt) => {
          this.setValue(evt.date);
      }).on('clearDate',(evt) => {
          this.setValue(this.getInitialValue());
      });

      $(this.input).datepicker('setDate',this.getValue());

  }

}
