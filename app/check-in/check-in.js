var observableModule = require('data/observable')
var observableArrayModule = require('data/observable-array')
var frameModule = require('ui/frame')
var createViewModel = require('./check-in-model').createViewModel
var timer = require('timer')


function pageLoaded (args) {
  var page = args.object
  if (page.ios) {
    var controller = frameModule.topmost().ios.controller

    // show the navbar
    frameModule.topmost().ios.navBarVisibility = 'always'

    // set the title
    page.ios.title = 'Estimote Beacons'

    var navigationBar = controller.navigationBar

    // set bar color to system blue constant
    // set bar color to a nice dark blue with RGBA
    navigationBar.barTintColor = UIColor.colorWithRedGreenBlueAlpha(157 / 255, 182 / 255, 168 / 255, 1)
    navigationBar.titleTextAttributes = new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName])
    navigationBar.barStyle = 1
  }

  page.bindingContext = createViewModel()
  viewModel = page.bindingContext
  var beacons = viewModel.beacons

  // set event on every scan
  beacons.on(observableArrayModule.ObservableArray.changeEvent, function (arg) {
    var beaconArray = arg.index
    beaconArray.forEach(function (b) {
          // get nearby beacons that is not checked
      if (b.isNearby && !viewModel.isCheckIn(b)) {
        
        viewModel.stop();
        viewModel.setBeacon(b);
        
        frameModule.topmost().navigate({
          moduleName: 'check-in/confirm-check-in/confirm',
          context: {"viewModel": viewModel}
        })

      }
    })
  })
}

exports.pageLoaded = pageLoaded
