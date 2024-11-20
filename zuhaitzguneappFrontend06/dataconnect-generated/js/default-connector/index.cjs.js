const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'zuhaitzguneappFrontend06',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

