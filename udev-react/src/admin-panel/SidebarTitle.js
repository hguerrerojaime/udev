import React from 'react';

export default class SidebarTitle extends React.Component {

  render() {


    return (
      <li style={ { padding: "5px", backgroundColor:"#ccc" } }>
        { this.props.title }
      </li>
    );
  }

}

SidebarTitle.defaultProps = {
  title: "Sidebar Title"
};
