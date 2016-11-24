var frameModule = require('ui/frame')

function createViewModel (context) {
  var viewModel = {},
    beacon = context.getBeacon()
  context.stop();
  viewModel.message = 'Hey, Are you in ' + beacon.major + '?'

  viewModel.goBack = function () {
    context.start();    
    frameModule.topmost().goBack(); 
  }

  viewModel.checkIn = function () {
    context.start();    
    context.checkIn()
    frameModule.topmost().goBack();

  }
  return viewModel
}

function onNavigatingTo (args) {
  var page = args.object,
    context = page.navigationContext.viewModel
  page.bindingContext = createViewModel(context);
  var beaconModel = page.bindingContext;
}




exports.onNavigatingTo = onNavigatingTo
