"use strict";

var Service, Characteristic;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-httpacs", "AcsDummySwitch", ACS);
}

function ACS(log, config) {
  this.log = log;
  this.name = config.name;

  // ADDED
  this.on_url = config["on_url"];
  this.off_url = config["off_url"];
  this.status_url = config["status_url"];

  // END ADDED

  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));
}

ACS.prototype = {

	httpRequest: function (url, body, method, username, password, sendimmediately, callback) {
        request({
                url: url,
                body: body,
                method: method,
                rejectUnauthorized: false,
                auth: {
                    user: username,
                    pass: password,
                    sendImmediately: sendimmediately
                }
            },
            function (error, response, body) {
                callback(error, response, body)
            })
    },


	getServices:function () {
		var informationService = new Service.AccessoryInformation();
		informationService
	        .setCharacteristic(Characteristic.Manufacturer, "ACS Audiovisual Solutions BV")
	        .setCharacteristic(Characteristic.Model, "Eltjo's Playground")
	        .setCharacteristic(Characteristic.SerialNumber, "20181231 :)");
		  return [this._service];
	},


	// Switch On Function
	_setOn:function(on, callback) {

	  this.log("Setting Switch to " + on);

	  if (on) {
	    setTimeout(function() {
	      this._service.setCharacteristic(Characteristic.On, false);
	    }.bind(this), 1000);
	  }

	  callback();
	}

} 
