import React from 'react';

export default class BreadCrumbs extends React.Component {
  render() {
    return (
        <div className="crumbs">
          <ul id="breadcrumbs" className="breadcrumb">
            <li>
              <i className="icon-home"></i>
              <a href="index.html">Dashboard</a>
            </li>
            <li className="current">
              <a href="pages_calendar.html" title="">Calendar</a>
            </li>
          </ul>
        </div>
      );
  }
}
