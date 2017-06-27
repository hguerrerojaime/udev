import React from 'react';
import Bindable from './Bindable';
import BtnGroup from '../commons/BtnGroup';
import Button from '../commons/Button';
import Well from '../commons/Well';
import Modal, { ModalFooter } from '../commons/Modal';

import Form from './Form';
import FormGroup from './FormGroup';
import Field from './Field';
import FieldType from './FieldType';
import InputCheckbox from './InputCheckbox';

class NewItemForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {}
    };
  }

  render() {
    return (
      <div>
        { this.getForm() }
      </div>
    );
  }

  initForm() {
    this.state = {form:{}};
  }

  getForm() {
     return this.props.parent.getDetailColumns().map((column) => {

         let fullModel = "form."+column.props.field;
         let fieldType = column.props.fieldType;

         this.state.form[column.props.field] = "";

         let { model,type, ...customProps } = column.props;

         return (
           <FormGroup label={column.props.label} key={column.props.field}>
             <Field stateHolder={this} model={fullModel} type={fieldType} {...customProps} />
           </FormGroup>
         );
     });
  }

}

export class DetailColumn extends React.Component {

  render() {
    return null;
  }

}

export default class InputDetail extends Bindable {

  constructor(props) {
    super(props);

    this.styles = {
      checkboxCell: {
        paddingLeft:"23px"
      },
      textCell: {
        verticalAlign:"middle"
      }
    };

  }

  render() {
    return (
      <div>
        <BtnGroup>
          <Button
              brand="success"
              label="Add"
              icon="fa fa-plus"
              size="sm"
              onClick={this.openNewItemModal.bind(this)}
          />
          <Button brand="danger" label="Remove" icon="fa fa-close" size="sm" />
        </BtnGroup>
        <hr />

					<table className="table table-striped table-bordered table-no-inner-border table-hover table-condensed">
						<thead>
							{ this.getHeaderRow() }
						</thead>
						<tbody>
							{ this.getItemRows() }
						</tbody>
					</table>

        <Modal
          ref={(modal) => this.modal = modal}
          title="Add Item"
           icon="fam fam-add">
           <div className="form-horizontal">
              <NewItemForm parent={this} ref={(newItemForm) => this.newItemForm = newItemForm } />
           </div>
           <ModalFooter>
              <Button brand="primary" icon="fa fa-check" label="OK" onClick={this.saveItem.bind(this)} />
              <Button icon="fa fa-close" label="Cancel" onClick={() => { this.modal.close(); }}/>
           </ModalFooter>

        </Modal>
      </div>
    );
  }

  getDetailColumns() {
     return React.Children.map(this.props.children,(child) =>
       child && child.type == DetailColumn ? child : null
     );
  }

  getHeaderRow() {
    let headerColumns = this.getDetailColumns().map((item) => {
        return (
          <th style={this.styles.textCell} key={item.props.field}>{item.props.label}</th>
        );
    });

    return (
        <tr>
          <th style={{width:"30px"}}>
            <InputCheckbox style={this.styles.checkboxCell}/>
          </th>
          {headerColumns}
        </tr>
    );
  }

  getItemRows() {

    let rows = this.binder.value.map((row) => {

        let rowColumns = this.getDetailColumns().map((item) => {
           return (
              <td style={this.styles.textCell}>{row[item.field]}</td>
           );
        });

        return (
          <tr>
            <td><InputCheckbox style={this.styles.checkboxCell} /></td>
            {rowColumns}
          </tr>
        );
    });

    return rows;

  }

  openNewItemModal() {
      this.newItemForm.initForm();
      this.modal.show();
  }

  saveItem() {
      console.log(this.newItemForm.state.form);

      this.binder.value.push(this.newItemForm.state.form);
      this.modal.close();
  }

  getInitialValue() {
    return [];
  }

}
