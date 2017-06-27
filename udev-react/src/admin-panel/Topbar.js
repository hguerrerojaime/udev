import React from 'react';
import AppBrand from './AppBrand';
import Navbar from 'udev-react/commons/Navbar';
import MenuItem from 'udev-react/commons/MenuItem';
import Dropdown from 'udev-react/commons/Dropdown';

export default class Topbar extends React.Component {

  render() {
    return (
      <div>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target=".navbar-collapse" aria-expanded="false"
                aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="fa fa-bars"></span>
          </button>
          <AppBrand />
        </div>
        <Navbar nav={ true } className="nav navbar-top-links navbar-right">
            <MenuItem href="#">Realm Home</MenuItem>
            <Dropdown label="Applications">
                <MenuItem href="#">Payroll</MenuItem>
            </Dropdown>
        </Navbar>
      </div>
    );
  }

}
