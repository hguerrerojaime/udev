import React from 'react';

import $ from 'jquery';
import Button from './Button';
import Icon from './Icon';

export class ModalFooter extends React.Component {
  render() {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    );
  }
}

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    let icon = this.props.icon ? <Icon name={this.props.icon} /> : null;

    return (
      <div className={"modal "+this.props.className} tabIndex="-1" role="dialog" ref={(element) => this.element = element }>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{ icon } { this.props.title }</h4>
            </div>
            <div className="modal-body clearfix">
               { this.getBodyChildren() }
            </div>
            { this.getFooter() }
          </div>
        </div>
      </div>
    );
  }

  getBodyChildren() {
     return React.Children.map(this.props.children,(child) =>
        child && child.type != ModalFooter ? child : null
     );
  }

  getFooter() {
    let footerChildren = React.Children.map(this.props.children,(child) =>
      child && child.type == ModalFooter ? child : null
    );

    return footerChildren.length > 0 ? footerChildren[footerChildren.length - 1] : null;
  }

  componentDidMount() {

    this.buildJQueryPlugin($(this.element));

    $(this.element).on('hide.bs.modal', (evt) => {
        this.props.onClose(evt);
    });

    $(this.element).on('show.bs.modal', (evt) => {
        this.props.onShow(evt);
    });
  }

  buildJQueryPlugin(jqElement) {

    jqElement.on('hide.bs.modal', function(){
        let $this = $(this);
        let stackCount = $('.modal.in').length-1;
        $('.modal.modal-stack-'+stackCount+' .modal-dialog.aside').removeClass('aside');
    });

    $(document).on('show.bs.modal', '.modal', function (event) {

        if (event.target.classList.contains("modal")) {

          var zIndex = 1040 + (10 * jQuery('.modal:visible').length);

          var $this = $(this);

          $this.css('z-index', zIndex);

          setTimeout(function() {
              $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
              $('.modal.in .modal-dialog').addClass('aside');

              let stackCount = $('.modal.in').length;

              $this.find('.modal-dialog').removeClass('aside');
              $this.addClass('modal-stack-'+stackCount);


          }, 0);

          //jqElement.appendTo('body');

        }

    });

  }


  show() {

      $(this.element).modal('show');
  }

  close() {
      $(this.element).modal('hide');
  }

}

Modal.defaultProps = {
  title: "Modal",
  onShow: (evt) => {},
  onClose: (evt) => {}
}
