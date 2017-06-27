import React from 'react';

export default class InputGroupAddon extends React.Component {

  render() {
    return (
        <span className={"input-group-"+this.props.type}>
          { this.props.children }
        </span>
    );
  }

}

InputGroupAddon.defaultProps = {
  type: "addon"
};
