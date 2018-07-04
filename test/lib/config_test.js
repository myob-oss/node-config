/* global it:false, describe:false, beforeEach:false */

const Config = require('../../lib/config.js');
const fixtures = require('../fixtures/config_fixtures.js');

describe('Config class', () => {
  let config;

  beforeEach(() => {
    config = new Config();
  });

  it('Should have empty config by default', (done) => {
    const defaultConfig = config.getConfig(config.getConstants().DEFAULT);
    const environmentConfig = config.getConfig(config.getConstants().ENVIRONMENT);
    const runtimeConfig = config.getConfig(config.getConstants().RUNTIME);
    const effectiveConfig = config.getConfig(config.getConstants().EFFECTIVE);

    defaultConfig.should.eql({});
    environmentConfig.should.eql({});
    runtimeConfig.should.eql({});
    effectiveConfig.should.eql({});

    done();
  });

  it('Should return constants', (done) => {
    const constants = config.getConstants();

    constants.should.have.property('DEFAULT');
    constants.should.have.property('ENVIRONMENT');
    constants.should.have.property('RUNTIME');
    constants.should.have.property('EFFECTIVE');

    done();
  });

  it('Should set the configuration settings', (done) => {
    const defaultConfigFixture = fixtures.generateDefaultConfig();
    const environmentConfigFixture = fixtures.generateEnvironmentConfig();
    const runtimeConfigFixture = fixtures.generateRuntimeConfig();

    let result = config.setConfig(config.getConstants().DEFAULT, defaultConfigFixture);

    result.should.be.ok();

    result = config.setConfig(config.getConstants().ENVIRONMENT, environmentConfigFixture);

    result.should.be.ok();

    result = config.setConfig(config.getConstants().RUNTIME, runtimeConfigFixture);

    result.should.be.ok();

    const defaultConfig = config.getConfig(config.getConstants().DEFAULT);
    const environmentConfig = config.getConfig(config.getConstants().ENVIRONMENT);
    const runtimeConfig = config.getConfig(config.getConstants().RUNTIME);

    defaultConfig.should.eql(defaultConfigFixture);
    environmentConfig.should.eql(environmentConfigFixture);
    runtimeConfig.should.eql(runtimeConfigFixture);

    done();
  });

  it('Should get the configuration settings', (done) => {
    const defaultConfigFixture = fixtures.generateDefaultConfig();
    const environmentConfigFixture = fixtures.generateEnvironmentConfig();
    const runtimeConfigFixture = fixtures.generateRuntimeConfig();

    config.setConfig(config.getConstants().DEFAULT, defaultConfigFixture);
    config.setConfig(config.getConstants().ENVIRONMENT, environmentConfigFixture);
    config.setConfig(config.getConstants().RUNTIME, runtimeConfigFixture);

    const defaultConfig = config.getConfig(config.getConstants().DEFAULT);
    const environmentConfig = config.getConfig(config.getConstants().ENVIRONMENT);
    const runtimeConfig = config.getConfig(config.getConstants().RUNTIME);
    const effectiveConfig = config.getConfig(config.getConstants().EFFECTIVE);
    const notPassedConfig = config.getConfig();

    defaultConfig.should.eql(defaultConfigFixture);
    environmentConfig.should.eql(environmentConfigFixture);
    runtimeConfig.should.eql(runtimeConfigFixture);
    notPassedConfig.should.eql(effectiveConfig);

    done();
  });

  it('Should not load the configuration for invalid values', (done) => {
    let result = config.setConfig('invalid', {});

    result.should.not.be.ok();

    result = config.setConfig(config.getConstants().DEFAULT, null);

    result.should.not.be.ok();

    done();
  });

  it('Should build the configuration settings', (done) => {
    const defaultConfigFixture = fixtures.generateDefaultConfig();
    const environmentConfigFixture = fixtures.generateEnvironmentConfig();
    const runtimeConfigFixture = fixtures.generateRuntimeConfig();

    config.setConfig(config.getConstants().DEFAULT, defaultConfigFixture);
    config.setConfig(config.getConstants().ENVIRONMENT, environmentConfigFixture);
    config.setConfig(config.getConstants().RUNTIME, runtimeConfigFixture);

    config.buildEffectiveConfig();

    const effectiveConfig = config.getConfig(config.getConstants().EFFECTIVE);

    effectiveConfig.configurationFile.should.equal('runtime');

    done();
  });
});
