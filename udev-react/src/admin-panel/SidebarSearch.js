import React from 'react';

import Button from 'udev-react/commons/Button';
import InputGroup from 'udev-react/forms/InputGroup';
import InputGroupAddon from 'udev-react/forms/InputGroupAddon';
import InputText from 'udev-react/forms/InputText';

export default class SidebarSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        q:undefined
      }
    };
  }

  render() {
    return (
      <li className="sidebar-search">
        <InputGroup>
           <InputText stateHolder={this} model="data.q" />
           <InputGroupAddon type="btn">
              <Button icon="fa fa-search"/>
           </InputGroupAddon>
        </InputGroup>
      </li>
    );
  }

}
