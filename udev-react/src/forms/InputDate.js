import React from 'react';
import Bindable from './Bindable';
import $ from 'jquery';
import 'bootstrap-datepicker';
import InputGroup from './InputGroup';
import InputGroupAddon from './InputGroupAddon';
import InputText from './InputText';
import Icon from '../commons/Icon';

export default class InputDate extends Bindable {

  constructor(props) {
    super(props);

    this.state = {
       wrapper: {
         formattedDate: ""
       }
    }
  }

  render() {
    return (
        <div className="input-group date" ref={(input) => this.input = input}>
           <InputText stateHolder={this}
              model="wrapper.formattedDate"
           />
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
          this.binder.value = evt.date;
      }).on('clearDate',(evt) => {
          this.binder.value = this.getInitialValue();
      });


  }


}
