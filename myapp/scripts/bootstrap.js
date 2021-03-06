const configGenerator = require('./generate-config');
const vueConfig = require('../vue.config');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.env.JSS_MODE === 'disconnected';

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
const configOverride = disconnected
  ? { sitecoreApiHost: `http://localhost:${vueConfig.devServer.port}` }
  : null;
configGenerator(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
