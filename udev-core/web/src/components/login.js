const firebase = require('firebase');

module.exports = {
  created: function() {
    this.forward();
  },
  methods: {
    signInGoogle() {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        this.forward();
      });

    },
    signInGitHub() {
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => {
        this.forward();
      });
    },
    forward() {
      if (firebase.auth().currentUser) {
        this.$router.push('/home');
      }
    }
  },
  template: `
<div class="container">
   <v-panel>
   <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
   <link type="text/css" rel="stylesheet" href="login.css">
   <div class="omb_login">
      <h3 class="omb_authTitle">Login</h3>
      <div class="row omb_row-sm-offset-3 omb_socialButtons" style="text-align:center;">
          <a href="javascript:void(0)" class="btn btn-lg omb_btn-google" v-on:click="signInGoogle">
            <i class="fa fa-google-plus"></i>
            <span class="hidden-xs">Google+</span>
          </a>
          <a href="javascript:void(0)" class="btn btn-lg omb_btn-github" v-on:click="signInGitHub">
            <i class="fa fa-github"></i>
            <span class="hidden-xs">Github</span>
          </a>
      </div>
   </div>
   </v-panel>
</div>
  `
};
