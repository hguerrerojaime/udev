import React from 'react';
import SidebarSearch from './SidebarSearch';
import MenuItem from 'udev-react/commons/MenuItem';
import SidebarTitle from './SidebarTitle';

export default class Sidebar extends React.Component {



  render() {
    return (
      <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
              <ul className="nav in" id="side-menu">
                 <SidebarSearch />
                 { this.getMenuItems() }
              </ul>
          </div>
      </div>
    );
  }

  getMenuItems() {

     let menuItems = [];

     this.props.menuItems.forEach((item,index) => {
        menuItems.push((
          <MenuItem icon={ item.icon } className="menu-item" href={ item.href }>
             { item.label }
          </MenuItem>
        ));
     });

     return menuItems;
  }
}
