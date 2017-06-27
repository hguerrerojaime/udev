import React from 'react';
import LinkButton from '../commons/LinkButton';
import SubmitButton from './SubmitButton';


export default class RecordActionBar extends React.Component {

  constructor(props) {
    super(props);

    this.actions = {
      "new": (
         <div>
           <SubmitButton label="Save" brand="primary" icon="fa fa-save" />
           { " " }
            <SubmitButton label="Save & New" brand="primary" icon="fa fa-save" />
           { " " }
           <LinkButton label="Cancel" icon="fa fa-close" />
         </div>
      ),
      "edit": (
         <div>
           <SubmitButton label="Save" brand="primary" icon="fa fa-save" />
           { " " }
           <LinkButton label="Cancel" icon="fa fa-close" />
          </div>
      ),
      "show": (
         <div>
           <LinkButton label="Edit" brand="success" icon="fa fa-pencil" href={"/provider/"+this.props.params.id+"/edit"} />
           { " " }
           <LinkButton label="Clone" icon="fa fa-clone" />
           { " " }
           <LinkButton label="Cancel" icon="fa fa-close" />
         </div>
      )
    };
  }


  render() {
    return this.actions[this.props.mode];
  }

}

RecordActionBar.propTypes = {
  mode: React.PropTypes.oneOf(["new","edit","show"])
}
