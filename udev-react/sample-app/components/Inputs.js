import React from 'react';

import { c,f } from '../../src/index';

export default class Inputs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        text:"this is a text",
        number:23,
        date: new Date(),
        option:"RED"
      }
    };

  }

  render() {
    return (
      <div>
        <h3>Inputs</h3>

        <div>
          <f.Form onSubmit={this.printForm.bind(this)}>
            <c.DivRow>
              <c.DivCol width="6">
                <f.FormGroup label="Input Text">
                  <f.InputText stateHolder={this} model="data.text" />
                </f.FormGroup>
              </c.DivCol>
              <c.DivCol width="6">
                <f.FormGroup label="Input Date">
                  <f.InputDate stateHolder={this} model="data.date" />
                </f.FormGroup>
              </c.DivCol>
            </c.DivRow>
            <c.DivRow>
              <c.DivCol width="6">
                <f.FormGroup label="Input Select">
                  <f.InputSelect stateHolder={this} model="data.option" options={["BLUE","GREEN","RED"]} />
                </f.FormGroup>
              </c.DivCol>
              <c.DivCol width="6">
                <f.FormGroup label="Input Select">
                  <f.InputSelect stateHolder={this} model="data.option" options={["BLUE","GREEN","RED"]} />
                </f.FormGroup>
              </c.DivCol>
            </c.DivRow>
            <c.DivRow>
              <c.DivCol>
                <c.Well size="sm">
                  <f.SubmitButton label="Submit" brand="primary" />
                </c.Well>
              </c.DivCol>
            </c.DivRow>

          </f.Form>
        </div>
      </div>
    );
  }

  printForm() {
    console.log(this.state.data);
  }

}
