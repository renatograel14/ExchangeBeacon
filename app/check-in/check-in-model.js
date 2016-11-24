var Observable = require('data/observable').Observable,
  observableArrayModule = require('data/observable-array'),
  Estimote = require('nativescript-estimote-sdk')


function dialogCallback(context){
    console.log(context);
}

function createBeaconModel (findNearbyBeaconCallback) {
  
  findNearbyBeaconCallback = findNearbyBeaconCallback ? findNearbyBeaconCallback : dialogCallback;

  var beaconModel = new Observable()

  beaconModel._beaconReadyToCheckIn = null

  beaconModel.beacons = new observableArrayModule.ObservableArray([])

  beaconModel.beaconsCheckIn = new observableArrayModule.ObservableArray([])

  beaconModel._isNearby = function (beacon) {
    return beacon.rssi >= -75
  }

  beaconModel.setBeacon = function (beacon) {
    beaconModel._beaconReadyToCheckIn = beacon
  }

  beaconModel.getBeacon = function () {
    return beaconModel._beaconReadyToCheckIn
  }

  beaconModel.isCheckIn = function (beacon) {
    for (var i = 0; i < beaconModel.beaconsCheckIn.length; i++) {
      var beaconCheckIn = beaconModel.beaconsCheckIn.getItem(i)
      if (beaconCheckIn.identifier == beacon.identifier) {
        return true
      }
    }
    return false
  }

  beaconModel.checkIn = function () {
    var beacon = beaconModel._beaconReadyToCheckIn
    console.log('checkIn', beacon.identifier)
    beaconModel.beaconsCheckIn.push(beacon)
  }

  beaconModel.start = function () {
    estimoteScanner.startRanging()
  }

  beaconModel.stop = function () {
    estimoteScanner.stopRanging();
  }

  

  var options = {
    callback: function (beacons) {
      for (var i = 0; i < beacons.length; i++) {
        var beacon = beacons[i]
        if (beacon.major > 0) {
          var distance = beaconModel._isNearby(beacon) ? 'Nearby' : 'Away'
          var identifier = 'Major:' + beacon.major + ' Minor:' + beacon.minor

          var item = {
            'identifier': identifier,
            'major': beacon.major,
            'distance': 'Distance: ' + distance,
            'rssi': 'Power: ' + beacon.rssi + 'dBm',
            'isNearby': beaconModel._isNearby(beacon)
          }

          if (item.isNearby && !beaconModel.isCheckIn(item)) {
            beaconModel.setBeacon(item);
            findNearbyBeaconCallback(beaconModel);
            break;
          }

        //   beaconModel.beacons.push(item)
        }
      }
    //   beaconModel.beacons.splice(0, beaconModel.beacons.length)
    }
  }

  estimoteScanner = new Estimote(options)
  estimoteScanner.startRanging();

  return beaconModel
}

exports.createBeaconModel = createBeaconModel
