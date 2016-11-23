var Observable = require("data/observable").Observable,
    observableArrayModule = require("data/observable-array"),
    Estimote = require('nativescript-estimote-sdk');


function isNearby(beacon) {
    return  beacon.rssi >= -75; 
}


function createViewModel() {
    var viewModel = new Observable();

    viewModel.beacons = new observableArrayModule.ObservableArray([]);
    
    viewModel.beaconsCheckIn = new observableArrayModule.ObservableArray([]);

    viewModel._beaconReadyToCheckIn = null;

    viewModel.setBeacon = function(beacon){
        viewModel._beaconReadyToCheckIn = beacon;
    }


    viewModel.getBeacon = function(){
        return viewModel._beaconReadyToCheckIn;
    }

    viewModel.isCheckIn = function(beacon) {     
        for (var i = 0; i < viewModel.beaconsCheckIn.length; i++) {
            var beaconCheckIn = viewModel.beaconsCheckIn.getItem(i);
            if(beaconCheckIn.identifier == beacon.identifier){
                console.log('isChecked', beacon.major);
                return true;
            } 
    
        }
        return false;
    }

    viewModel.checkIn = function(){
        var beacon = viewModel._beaconReadyToCheckIn;
        console.log('checkIn',beacon.identifier);
        viewModel.beaconsCheckIn.push(beacon);
    }


    viewModel.start = function(){
        estimoteScanner.startRanging();
    }

    viewModel.stop = function(){
        estimoteScanner.stopRanging();
    }

    this.options = {
        callback : function(beacons){
          var items =[];
          

          for (var i = 0; i < beacons.length; i++) {
             var beacon = beacons[i];
             if (beacon.major > 0){
               

                var distance = isNearby(beacon) ? "Nearby" : "Away" ;
                var identifier = "Major:" + beacon.major + " Minor:" + beacon.minor;


                var item = {
                    "identifier": identifier,
                    "major": beacon.major,
                    "distance":  "Distance: " + distance,
                    "rssi": "Power: " +  beacon.rssi + "dBm",
                    "isNearby": isNearby(beacon) 
                };

                // if(item.isNearby ) viewModel.checkIn(item);

                items.push(item);
             }
          }
          viewModel.beacons.splice(new observableArrayModule.ObservableArray(items));
        //   viewModel.set('beacons',  new observableArrayModule.ObservableArray(items));
        }
    };

    estimoteScanner = new Estimote(this.options);
    estimoteScanner.startRanging();

    return viewModel;
}

exports.createViewModel = createViewModel;