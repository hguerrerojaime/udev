import React from 'react';

import { c, core } from '../../src/index';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <c.Navbar className="header navbar-inverse navbar-fixed-top">
          <a className="navbar-brand" href="/">uDev Dashboard</a>
          <ul className="nav navbar-nav">
            <c.Dropdown label="Regions">
              <li>
                  <a href="#">
                    New Region
                  </a>
              </li>
              <li>
                  <a href="#">
                    List Regions
                  </a>
              </li>
            </c.Dropdown>
          </ul>
        </c.Navbar>
        <c.Panel title="Buttons" brand="primary">
          <h3>Buttons</h3>
          <div className="btn-group">
            <c.Button label="Default" />
            <c.Button label="Primary" brand="primary"/>
            <c.Button label="Success" brand="success"/>
            <c.Button label="Info" brand="info"/>
            <c.Button label="Warning" brand="warning"/>
            <c.Button label="Danger" brand="danger"/>
          </div>
          <h3>Modals</h3>
          <div>
            <c.Button label="Message Modal"
                      brand="primary"
                      onClick={() => core.alert.message("This is a message") }
            /> {" "}
            <c.Button label="Confirm Modal"
                      brand="primary"
                      onClick={() => core.alert.confirm("Are you sure?", ()=> console.log("yes") ) }
            />
          </div>
        </c.Panel>
      </div>
    );
  }

}
