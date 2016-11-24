var application = require("application");

application.cssFile = "./app.css";
application.mainModule = "check-in/check-in";


application.start();

var createViewModel = require('./check-in/check-in-model').createViewModel;
global.beacons = createViewModel();

