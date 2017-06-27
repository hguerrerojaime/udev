import React from 'react';
import Modal, { ModalFooter } from './Modal';
import Button from './Button';

export default class ConfirmModal extends React.Component {

  render() {
    return (
       <Modal icon="fa fa-info" ref={(modal) => { this.modal = modal; if (modal) modal.show(); }}
          title={this.props.type}
          onClose={this.props.onClose}
        >
          { this.props.children }
          <ModalFooter>
             <Button label="Ok" brand="primary" icon="fa fa-check" onClick={() => {
                this.props.onConfirm();
                this.modal.close();
              }} />
              <Button label="Cancel" icon="fa fa-close" onClick={()=> this.modal.close()} />
          </ModalFooter>
       </Modal>
    );
  }

}


ConfirmModal.defaultProps = {
  type: "info",
  onClose: () => {},
  onConfirm: () => {}
};
