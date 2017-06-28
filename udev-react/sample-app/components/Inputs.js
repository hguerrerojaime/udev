import React from 'react';

import { c,f } from '../../src/index';

export default class Inputs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        text:"this is a text",
        number:23,
        date: new Date()
      }
    };

  }

  render() {
    return (
      <div>
        <h3>Inputs</h3>

        <div>
          <f.Form>
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
          </f.Form>
        </div>
      </div>
    );
  }

}
