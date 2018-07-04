const merge = require('deepmerge');

const DEFAULT = 'DEFAULT';
const ENVIRONMENT = 'ENVIRONMENT';
const RUNTIME = 'RUNTIME';
const EFFECTIVE = 'EFFECTIVE';

class Config {
  constructor() {
    this.resetConfig();
  }

  getConfig(env) {
    let output = {};

    switch (env) {
      case DEFAULT:
        output = this.defaultConfig;
        break;
      case ENVIRONMENT:
        output = this.environmentConfig;
        break;
      case RUNTIME:
        output = this.runtimeConfig;
        break;
      default:
        output = this.effectiveConfig;
        break;
    }

    return output;
  }

  setConfig(env, configObject) {
    if (!env || !configObject) {
      return false;
    }

    switch (env) {
      case DEFAULT:
        this.defaultConfig = configObject;
        break;
      case ENVIRONMENT:
        this.environmentConfig = configObject;
        break;
      case RUNTIME:
        this.runtimeConfig = configObject;
        break;
      default:
        // Do not update a configuration file
        return false;
    }

    return true;
  }

  buildEffectiveConfig() {
    const intermediateConfig = merge(this.defaultConfig, this.environmentConfig);
    this.effectiveConfig = merge(intermediateConfig, this.runtimeConfig);
  }

  resetConfig() {
    this.defaultConfig = {};
    this.environmentConfig = {};
    this.runtimeConfig = {};
    this.effectiveConfig = {};
  }

  getConstants() { // eslint-disable-line class-methods-use-this
    return {
      DEFAULT,
      ENVIRONMENT,
      RUNTIME,
      EFFECTIVE,
    };
  }
}

module.exports = Config;
