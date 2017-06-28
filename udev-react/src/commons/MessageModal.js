import React from 'react';
import Modal from './Modal';

export default class MessageModal extends React.Component {

  render() {
    return (
      <Modal className={this.props.className} ref={(modal) => { this.modal = modal; if (modal) modal.show(); }}
      title={this.props.type.capitalize()}
      icon={this.props.icon}
      onClose={this.props.onClose}>
          { this.props.children }
      </Modal>
    );
  }

}

MessageModal.defaultProps = {
  type: "info",
  onClose: () => {}
};
