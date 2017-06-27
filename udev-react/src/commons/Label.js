import React from 'react';

export default class Label extends React.Component {

  render() {
    return (
      <span className={"label label-"+this.props.brand} style={this.props.style}>{this.props.children}</span>
    );
  }

}

Label.defaultProps = {
  brand:"default",
  style:{}
};
