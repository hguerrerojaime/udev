import React from 'react';

export default class MenuItem extends React.Component {

  render() {

    let icon = this.props.icon ? <i className={this.props.icon}></i> : null;

    return (
      <li className={ this.props.className }>
          <a href={ this.props.href }>
            { icon }
            { this.props.children }
          </a>
      </li>
    );
  }

}
