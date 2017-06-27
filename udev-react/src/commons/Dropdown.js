import React from 'react';

export default class DropDown extends React.Component {

  render() {
    return (
      <li className="dropdown">
          <a href={ this.props.href }
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button" aria-haspopup="true"
                  >{this.props.label}</a>
          <ul className="dropdown-menu">
              {this.props.children}
          </ul>
      </li>
    );
  }

}
