const fs = require('fs');
const JSON5 = require('json5');

class File {
  constructor() {
    this.setBasePath();
  }

  setBasePath() {
    this.basePath = `${process.cwd()}/config/`;
  }

  getBasePath() {
    return this.basePath;
  }

  getFileContents(whichFile) {
    const fullPath = `${this.getBasePath()}${whichFile}`;
    let fileContents = '{}';

    try {
      if (fs.statSync(fullPath).isFile()) {
        fileContents = fs.readFileSync(fullPath).toString();
      }
    } catch (e) {
      fileContents = '{}';
    }

    return JSON5.parse(fileContents);
  }

  getEnvironment() { // eslint-disable-line class-methods-use-this
    const environment = process.env.NODE_ENV;

    if (!environment || environment === 'null') {
      return 'production';
    } else { // eslint-disable-line no-else-return
      return environment;
    }
  }
}

module.exports = File;
