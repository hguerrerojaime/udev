import React from 'react';

import { c } from '../../src/index';

import Buttons from './Buttons';
import Modals from './Modals';
import Inputs from './Inputs';

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
        <c.Panel title="Dashboard" brand="primary">
          <Buttons />
          <Modals />
          <Inputs />
        </c.Panel>
      </div>
    );
  }

}
