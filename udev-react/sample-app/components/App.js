import React from 'react';

import { c } from 'udev';

import New from 'popo/l/59b965d85572472698afaa9e/new';

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
        <New />
      </div>
    );
  }

}
