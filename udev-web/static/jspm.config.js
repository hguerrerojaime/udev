SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "udev-web/": "/src/"
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "udev-web/": "src/"
    }
  },
  packages: {
    "udev-web": {
      "main": "app.js",
      "format": "cjs"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "jpex": "npm:jpex@2.0.0",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "udev-vue": "npm:udev-vue@1.0.0",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vue": "npm:vue@2.5.9"
  },
  packages: {
    "npm:udev-vue@1.0.0": {
      "map": {
        "select2": "npm:select2@4.0.5",
        "string-format": "npm:string-format@0.5.0",
        "vue-config": "npm:vue-config@1.0.0",
        "bootstrap-daterangepicker": "npm:bootstrap-daterangepicker@2.1.25",
        "jquery-mask-plugin": "npm:jquery-mask-plugin@1.14.12",
        "jquery": "npm:jquery@3.2.1",
        "bootstrap": "npm:bootstrap@3.3.7",
        "vue-inject": "npm:vue-inject@1.0.1",
        "vue": "npm:vue@2.5.9",
        "moment": "npm:moment@2.19.3"
      }
    },
    "npm:bootstrap-daterangepicker@2.1.25": {
      "map": {
        "jquery": "npm:jquery@3.2.1",
        "moment": "npm:moment@2.19.3"
      }
    },
    "npm:select2@4.0.5": {
      "map": {
        "jquery-mousewheel": "npm:jquery-mousewheel@3.1.13",
        "almond": "npm:almond@0.3.3"
      }
    },
    "npm:vue-inject@1.0.1": {
      "map": {
        "jpex-web": "npm:jpex-web@2.0.0",
        "jpex": "npm:jpex@2.0.0"
      }
    },
    "npm:jpex-web@2.0.0": {
      "map": {
        "jpex-defaults": "npm:jpex-defaults@2.0.0",
        "promise-polyfill": "npm:promise-polyfill@6.1.0"
      }
    }
  }
});
