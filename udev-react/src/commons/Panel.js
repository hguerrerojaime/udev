import React from 'react';

export default class Panel extends React.Component {

  render() {


    return (
       <div className={ "panel shadow panel-border top panel-"+this.props.brand }>
          <div className="panel-heading">
              <span className="panel-title">{ this.props.title }</span>
          </div>
          <div className="panel-body">
              { this.props.children }
          </div>
       </div>
    );
  }

}

Panel.defaultProps = {
   size: "md",
   brand: "default"
};
