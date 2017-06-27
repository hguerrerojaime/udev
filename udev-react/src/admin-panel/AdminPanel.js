import React from 'react';

import AppMenu from './AppMenu';

import $ from 'jquery';

export default class AdminPanel extends React.Component {

   render() {
        return (
          <div id="wrapper">
            <AppMenu menuItems={ this.props.menuItems } />
            <div id="page-wrapper" style={{ minHeight: "261px"}}>
              <div>
                {this.props.children}
              </div>
            </div>
            <div id="alert-wrapper"></div>
          </div>
        );
   }

   componentDidMount() {
      initBodySetup();
   }

}

let initBodySetup = () => {
  var width, height, topOffset;

  $(window).bind("resize", function() {
      topOffset = 40;
      width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
      if (width < 768) {
          $('div.navbar-collapse').addClass('collapse');
          topOffset = 100; // 2-row-menu
      } else {
          $('div.navbar-collapse').removeClass('collapse');
      }

      height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
          $("#page-wrapper").css("min-height", (height) + "px");
      }

  });

  $(window).trigger("resize");
}
