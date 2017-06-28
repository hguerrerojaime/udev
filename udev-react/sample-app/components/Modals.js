import React from 'react';

import { c, core } from '../../src/index';

export default class Modals extends React.Component {

  render() {
    return (
      <div>
        <h3>Modals</h3>
        <div>
          <c.Button label="Message Modal"
                    brand="primary"
                    onClick={() => core.alert.message("This is a message") }
          /> {" "}
          <c.Button label="Confirm Modal"
                    brand="primary"
                    onClick={() => core.alert.confirm("Are you sure?", ()=> console.log("confirmed") ) }
          />
        </div>
      </div>
    );
  }

}
