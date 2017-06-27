import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header navbar navbar-inverse navbar-fixed-top" role="banner">
         <div className="container">
             <ul className="nav navbar-nav">
                 <li className="nav-toggle">
                     <a href="javascript:void(0);" title="">
                         <i className="icon-reorder"></i>
                     </a>
                 </li>
             </ul>
             <a className="navbar-brand" href="index.html">
                 <strong>BIITS</strong>CRM
             </a>
             <a href="#" className="toggle-sidebar bs-tooltip" data-placement="bottom" data-original-title="Toggle navigation">
                 <i className="fa fa-reorder"></i>
             </a>
             <ul className="nav navbar-nav navbar-left hidden-xs hidden-sm">
                 <li>
                     <a href="#"> Dashboard </a>
                 </li>
                 <li className="dropdown">
                     <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                       Dropdown <i className="fa fa-caret-down small"></i>
                     </a>
                     <ul className="dropdown-menu">
                         <li><a href="#"><i className="icon-user"></i> Example #1</a>
                         </li>
                         <li><a href="#"><i className="icon-calendar"></i> Example #2</a>
                         </li>
                         <li className="divider"></li>
                         <li><a href="#"><i className="icon-tasks"></i> Example #3</a>
                         </li>
                     </ul>
                 </li>
             </ul>
             <ul className="nav navbar-nav navbar-right">

             </ul>
         </div>
        </header>
    );
  }
}
