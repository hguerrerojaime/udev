import React from 'react';

export default class DivCol extends React.Component {

  render() {
    return (
      <div className={ "col-"+this.props.size+"-"+this.props.width }>
          { this.props.children }
      </div>
    );
  }

}

DivCol.defaultProps = {
  size: "md",
  width: 12
}
