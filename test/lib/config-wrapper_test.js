/* global it:false, describe:false */

const config = require('../../lib/config-wrapper.js');

describe('ConfigWrapper class', () => {
  it('Should expose the configuration', (done) => {
    config.should.have.property('which');
    config.which.should.eql('runtime');
    done();
  });
});
