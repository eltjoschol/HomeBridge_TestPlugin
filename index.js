"use strict";

var Service, Characteristic;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("HomeBridge_TestPlugin", "ACSSwitch", ACSSwitch);
}

function ACSSwitch(log, config) {
  this.log = log;
  this.name = config.name;
  this.stateful = config.stateful;

  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));
}

ACSSwitch.prototype.getServices = function() {
  return [this._service];
}

ACSSwitch.prototype._setOn = function(on, callback) {

  this.log("Setting switch to " + on);

  if (on && !this.stateful) {
    setTimeout(function() {
      this._service.setCharacteristic(Characteristic.On, false);
    }.bind(this), 1000);
  }

  callback();
}