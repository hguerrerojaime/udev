import React from 'react';
import DivCol from '../commons/DivCol';

export default class FormGroup extends React.Component {

  render() {

    let label = this.props.label ? (
      <label className={"control-label col-"+this.props.size+"-"+(12 - this.props.width)}>
        {this.props.label}
      </label>
    ) : null;

    return (
      <div className="form-group">
          { label }
          <DivCol size={this.props.size} width={this.props.width}>
            {this.props.children}
          </DivCol>
      </div>

    );
  }

}

FormGroup.defaultProps = {
  size: "md",
  width: 10
};
