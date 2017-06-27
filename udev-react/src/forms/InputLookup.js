import React from 'react';

import Button from '../commons/Button';
import InputGroup from './InputGroup';
import Bindable from './Bindable';
import InputGroupAddon from './InputGroupAddon';
import InputText from './InputText';
import Modal from '../commons/Modal';
import Well from '../commons/Well';
import DivRow from '../commons/DivRow';
import DivCol from '../commons/DivCol';
import Form from './Form';
import Label from '../commons/Label';
import Icon from '../commons/Icon';
import resolver from '../core/di';
import update from 'react-addons-update';
import InlineLoader from '../commons/InlineLoader';

let labelStyle = {
  display:"inline-block",
  maxWidth:"100%",
  overflow:"hidden",
  textOverflow:"ellipsis",
  whiteSpace:"nowrap",
  verticalAlign:"middle"
};


export default class InputLookup extends Bindable {

  constructor(props) {
    super(props);

    this.state = {
      lookup: this.initLookup()
    };

    this.showLookupModal = this.showLookupModal.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.lookupKey = this.lookupKey.bind(this);
    this.service = resolver.get(this.props.lookupService);



  }

  initLookup() {
     return {
       id:null,
       key:"",
       value:null
     };
  }

  resetLookup() {
    this.binder.value = null;
    this.state = { lookup: this.initLookup() };
//
  }

  componentDidMount() {

    if (this.hasModel() && !this.binder.value) {
      this.binder.value = {};
    }

    this.setState({ lookup:this.binder.value });

  }

  render() {
    return (
      <div>
      <DivRow style={ {paddingBottom: "5px" }}>
        <DivCol>
          <InputGroup>
             <InputText
                ref={(txtLookup) => this.txtLookup = txtLookup }
                stateHolder={this}
                model="lookup.key"
                onChange={(evt) => {

                   if (evt.target.value == "") {
                     this.resetLookup();
                   }
                }}
             />
             <InputGroupAddon type="btn">
                <Button icon="fa fa-search" brand="info" onClick={this.showLookupModal} />
             </InputGroupAddon>
          </InputGroup>
        </DivCol>
        <LookupModal
            parent={this}
            onItemSelected={this.updateSelected}
            ref={(lookupModal) => this.lookupModal = lookupModal}
        />
      </DivRow>
      <DivRow>
        <DivCol>
          <h4>
          <Label brand={this.getLookupValueBrand()} style={labelStyle}>
              {this.getLookupValue()}

          </Label>
          </h4>
        </DivCol>
      </DivRow>
      </div>
    );
  }

  showLookupModal() {
    this.lookupModal.show();
  }

  getLookupValue() {
     return this.state.lookup.id ? this.state.lookup.value : "No Value";
  }
  getLookupValueBrand() {
    return this.state.lookup.id ? "success" : "default";
  }

  lookupKey() {

     if (this.manualSearch) {
       this.setState({
         lookup: {

         }
       });

       this.service.lookupKey(this.state.lookup.key).then((item) => {
          this.updateValue(item);
       });
     }

  }

  updateSelected(item) {
    this.updateValue(item);
    this.manualSearch = false;
    setTimeout(() => {
      this.txtLookup.focus();
      this.txtLookup.select();
    },20);


  }

  updateValue(item) {
    this.setState({lookup:item},() => this.txtLookup.binder.value = item.key);
    this.binder.value = item;
  }

}

InputLookup.defaultProps = Object.merge(Bindable.defaultProps,{});

InputLookup.propTypes = Object.merge(Bindable.propTypes,{
    lookupService: React.PropTypes.string.isRequired
});

class LookupModal extends React.Component {

  constructor(props) {
    super(props);
    this.filterSearch = this.filterSearch.bind(this);

    this.state = {
       loading:false,
       timer: undefined,
       fullResultList: [],
       resultList: [],
       form: {
         search:""
       }
    };


  }

  render() {
    return (
      <Modal title="Lookup Supervisors" ref={(modal) => this.modal = modal}>
         <p className="clearfix">
             <InputText
                 ref={(txtSearch) => this.txtSearch = txtSearch}
                 stateHolder={this}
                 placeholder="Search..."
                 model="form.search"
                 onChange={this.filterSearch}
                 onKeyPress={(evt) => {

                    if (evt.key == "Enter") {
                       evt.preventDefault();
                       if (this.state.resultList.length > 0) {
                         this.selectItem(this.state.resultList[0]);
                       }
                    }

                 }}
             />
         </p>
         <hr/>
         <div className="clearfix">
             { this.getResultsBody() }
         </div>
      </Modal>
    );
  }

  show() {
    this.txtSearch.binder.value = "";
    this.modal.show();
    this.lookupList();
    this.txtSearch.focus();
  }

  close() {
    this.modal.close();
  }

  filterSearch(evt) {

    clearTimeout(this.state.timer);

    let search = evt.target.value;

    if (!this.searchTmp) {
      this.searchTmp = search;
    }

    let listIsNarrowedDown = this.searchTmp.length <= search.length

    let list = listIsNarrowedDown ? this.state.resultList : this.state.fullResultList;

    if (search != "") {
      list = list.filter((item) => {
          return item.key.toUpperCase().indexOf(search.toUpperCase()) >=0 ||
             item.value.toUpperCase().indexOf(search.toUpperCase()) >=0;
      });

      if (list.length < 1) {
        this.setState({ loading:true });
        this.state.timer = setTimeout(()=> {
            this.lookupList();
        },1000);
      }

    } else if (list.length < this.state.fullResultList.length) {
      this.setState({ loading:true });
      this.state.timer = setTimeout(()=> {
          this.lookupList();
      },1000);

    }



    this.setState({
      resultList: list
    });

    this.searchTmp = search;
  }

  lookupList() {
      this.setState({ loading:true });

      this.props.parent.service.lookupList(this.props.parent.props.domainObject,this.state.form.search).then((resultList) => {
         this.setState({
           fullResultList: resultList,
           resultList: resultList,
           loading: false
         });
      });

  }

  getResultsBody() {

      if(this.state.loading) {
         return this.renderWell(<InlineLoader />);
      } else if (!this.state.loading && this.state.resultList.length == 0) {
         return this.renderWell("No results found");
      } else {
         return this.renderResultTable();
      }
  }

  renderWell(message) {
    return <Well size="sm"><div className="text-center"> { message } </div></Well>;
  }

  renderResultTable() {

    let rows = this.state.resultList.map((item) => {
       return (
         <tr key={item.id} onClick={() => { this.selectItem(item); } }>
           <td className="key-col">{item.key}</td>
           <td>{item.value}</td>
         </tr>
       );
    });

    return (
        <table className="table table-condensed table-striped lookup-table">
        <thead>
          <tr>
            <th className="key-col" >Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
            { rows }
        </tbody>
      </table>
    );
  }

  selectItem(item) {
      this.props.onItemSelected(item);
      this.close();
  }
}

InputLookup.defaultProps = {
  lookupService: "lookupService"
}
