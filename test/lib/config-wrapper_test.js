/* global it:false, describe:false */

const config = require('../../lib/config-wrapper.js');
const config2 = require('../../lib/config-wrapper.js');

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
});
