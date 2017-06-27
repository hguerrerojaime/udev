import React from 'react';

import Icon from '../commons/Icon';

export default class SubmitButton extends React.Component {

  render() {

    let icon = this.props.icon ? <Icon name={this.props.icon} /> : null;

    return (
      <button
          type="submit"
          className={"btn btn-"+this.props.brand+" btn-"+this.props.size}
          onClick={this.props.onClick}
      >
         { icon } { this.props.label }
      </button>
    );
  }

}

SubmitButton.defaultProps = {
  size: "md",
  label: null,
  brand: "default",
  onClick: (evt) => {}
};
