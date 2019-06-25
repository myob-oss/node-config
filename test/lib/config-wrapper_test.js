/* global it:false, describe:false */

const config = require('../../lib/config-wrapper.js');
const config2 = require('../../lib/config-wrapper.js');
require('should');

describe('ConfigWrapper class', () => {
  it('Should expose the configuration', (done) => {
    config.should.have.property('configurationFile');
    config.configurationFile.should.eql('runtime');
    done();
  });

  it('Should expose the same configuration if it is required twice', (done) => {
    config2.should.have.property('configurationFile');
    config2.configurationFile.should.eql('runtime');
    config2.configurationFile.should.eql(config.configurationFile);
    done();
  });

  it('Should expose the same configuration if it is required for a third time later on', (done) => {
    setTimeout(() => {
      const config3 = require('../../lib/config-wrapper.js'); // eslint-disable-line global-require
      config3.should.have.property('configurationFile');
      config3.configurationFile.should.eql('runtime');
      config3.configurationFile.should.eql(config.configurationFile);
      done();
    }, 300);
  });
});
