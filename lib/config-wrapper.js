const Config = require('./config.js');
const File = require('./file.js');

let effectiveConfigObject = {};

class ConfigWrapper {
  constructor() {
    const file = new File();
    const defaultConfigObject = file.getFileContents('default.json');
    const environmentConfigObject = file.getFileContents(`${file.getEnvironment()}.json`);
    const runtimeConfigObject = file.getFileContents('runtime.json');

    const config = new Config();
    config.setConfig(config.getConstants().DEFAULT, defaultConfigObject);
    config.setConfig(config.getConstants().ENVIRONMENT, environmentConfigObject);
    config.setConfig(config.getConstants().RUNTIME, runtimeConfigObject);
    config.buildEffectiveConfig(config.getConstants().EFFECTIVE);

    effectiveConfigObject = config.getConfig();
  }

  getEffectiveConfigObject() { // eslint-disable-line class-methods-use-this
    return effectiveConfigObject;
  }
}

module.exports = (new ConfigWrapper()).getEffectiveConfigObject();
