import React from 'react';

export default class Well extends React.Component {

  render() {
    return (
      <div className={"well well-"+this.props.size}>
          { this.props.children }
      </div>
    );
  }

}

Well.defaultProps = {
  size: "md"
}
