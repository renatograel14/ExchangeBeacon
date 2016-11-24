var observableModule = require('data/observable')
var observableArrayModule = require('data/observable-array')
var frameModule = require('ui/frame')
var createViewModel = require('./check-in-model').createViewModel
var timer = require('timer')

function pageNavigatedTo (args) {
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
  page.bindingContext = global.beaconsModel
}

exports.pageNavigatedTo = pageNavigatedTo
