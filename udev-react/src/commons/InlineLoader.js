import React from 'react';

export default class InlineLoader extends React.Component {

  render() {
    return this.props.show ? <img src="img/ajax-loading-input.gif" /> : null;
  }

}

InlineLoader.defaultProps = {
  show:true
}
