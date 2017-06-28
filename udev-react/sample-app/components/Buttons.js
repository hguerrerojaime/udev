import React from 'react';

import { c } from '../../src/index';

export default class Buttons extends React.Component {

  render() {
    return (
      <div>
        <h3>Buttons</h3>
        <div className="btn-group">
          <c.Button label="Default" icon="fa fa-bars" />
          <c.Button label="Primary" brand="primary" icon="fa fa-save"/>
          <c.Button label="Success" brand="success" icon="fa fa-check"/>
          <c.Button label="Info" brand="info" icon="fa fa-info-circle"/>
          <c.Button label="Warning" brand="warning" icon="fa fa-warning"/>
          <c.Button label="Danger" brand="danger" icon="fa fa fa-exclamation-circle"/>
        </div>
      </div>
    );
  }

}
