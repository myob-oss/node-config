/* global it:false, describe:false, beforeEach:false */

const File = require('../../lib/file.js');

describe('File class', () => {
  let file;

  beforeEach((done) => {
    file = new File();
    done();
  });

  it('Should set the base path', (done) => {
    const basePath = file.getBasePath();

    basePath.indexOf(process.cwd()).should.eql(0);
    basePath.indexOf('/config/').should.eql(basePath.length - 8);

    done();
  });

  it('Should get the contents of a file', (done) => {
    const result = file.getFileContents('default.json');

    result.should.eql({ configurationFile: 'default' });

    done();
  });

  it('Should get the environment', (done) => {
    const currentEnvironment = process.env.NODE_ENV;

    process.env.NODE_ENV = 'test';

    let result = file.getEnvironment();

    process.env.NODE_ENV = null;

    result = file.getEnvironment();

    result.should.eql('production');

    delete process.env.NODE_ENV;

    result = file.getEnvironment();

    result.should.eql('production');

    process.env.NODE_ENV = currentEnvironment;

    done();
  });
});
