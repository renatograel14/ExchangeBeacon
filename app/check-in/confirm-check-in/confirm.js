var frameModule = require('ui/frame')

function createViewModel (context) {
  var viewModel = {},
 beacon = context.getBeacon();

  viewModel.message = 'Hey, Are you in '+beacon.major+'?'

  viewModel.goBack = function () {
    frameModule.topmost().goBack()
  }

  viewModel.checkIn = function () {
    context.checkIn()
    frameModule.topmost().goBack()
  }
  return viewModel
}

function onNavigatingTo (args) {
  var page = args.object,
    context = page.navigationContext.viewModel
  page.bindingContext = createViewModel(context);
}

exports.onNavigatingTo = onNavigatingTo
