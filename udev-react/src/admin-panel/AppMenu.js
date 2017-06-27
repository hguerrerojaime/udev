import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Navbar from 'udev-react/commons/Navbar';

export default class AppMenu extends React.Component {
  render() {
    return (
      <Navbar className="navbar-inverse navbar-fixed-top shadow">
         <Topbar />
         <Sidebar menuItems={ this.props.menuItems } />
      </Navbar>
    );
  }
}
