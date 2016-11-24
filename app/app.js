var application = require("application");
var frameModule = require('ui/frame');

application.cssFile = "./app.css";
application.mainModule = "check-in/check-in";


application.start();

var createBeaconModel = require('./check-in/check-in-model').createBeaconModel;
global.beaconsModel = createBeaconModel(function(context){
    frameModule.topmost().navigate({
      moduleName: 'check-in/confirm-check-in/confirm',
      context: {'viewModel': context},
      transition: {
        name: 'fade'
      }
    })
});


