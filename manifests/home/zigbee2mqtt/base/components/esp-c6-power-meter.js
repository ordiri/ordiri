const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['ESP32C6.Powermeter'],
    model: 'ESP32C6.Powermeter',
    vendor: 'DavidMann',
    description: 'Power meter',
    fromZigbee: [fz.electrical_measurement],
    toZigbee: [],
    exposes: [e.current(), e.power(), e.energy(), e.voltage()],
    // configure: async (device, coordinatorEndpoint, logger) => {
    //     const endpoint = device.getEndpoint(1);
    //     await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement']);
    //     // await reporting.instantaneousDemand(endpoint);
    //     // await reporting.currentSummDelivered(endpoint);
    //     // //await reporting.currentSummReceived(endpoint);
    //     // endpoint.saveClusterAttributeKeyValue('seMetering', { divisor: 10000, multiplier: 1 });
    // },
};

module.exports = definition;