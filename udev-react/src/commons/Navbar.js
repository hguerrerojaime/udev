import React from 'react';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className={(this.props.nav ? "navbar-nav": "navbar")+" "+this.props.className}>
        { this.props.children }
      </nav>
    );
  }

}
