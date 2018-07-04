# @myob-oss/config

A simple, slightly opinionated, and predictable configuration module for Node.js applications.

To install the module in your project use the following command.

```bash
npm install @myob-oss/config
```

To use the module (after you have installed it in your project), you only need to require it, and it exposes the configuration as an Object.

```js
const config = require('@myob-oss/config');

console.log(config.configurationFile); // prints "runtime" from the example below.
```

Yes, this is another configuration module. We know there are others out there. We created this configuration module to simplify and unify the way in which we configured our node applications to work with our various environments including our cloud infrastructure, continuous delivery pipelines and running our apps locally.

The benefits we have seen from using this configuration module are:

* A consistent way to enable environmentally-aware configuration across a suite of node applications.
* Easy to use, just require the module and there is your configuration ready to use.
* Doesn't force you to repeat configuration that is consistent across all environments.
* Easy to see the running config file by inspecting the runtime.json file. (Works great for just shelling in a taking a look!)

This configuration module has also been mentioned in the [Under The Hood](https://medium.com/myobunderthehood/why-configuration-matters-25456109041d) series of blog posts.

## How the Configuration Hierarchy Works

This module uses the environment variable `NODE_ENV` to determine which configuration file to load.

The module assumes that all the configuration files are in [JSON](https://www.json.org/) format and in the `/config` folder at the top level of the project. The JSON files can have comments in them, as the module uses the [json5](https://www.npmjs.com/package/json5) module to parse the config files.

The module loads 3 configuration files in the following order (each overwrites the previous if they have the same key):

* default.json
* environment.json (where environment is taken from the NODE_ENV environment variable. It uses "production" as default if the environment variable is not set)
* runtime.json

Each configuration file will override values from the previous file. For example:

default.json
```json
{
  "configurationFile": "default",
  "disableConsole": false
}
```

production.json
```json
{
  "debugLevel": "trace"
}
```

runtime.json
```json
{
  "configurationFile": "runtime",
  "validHosts": ["localhost", "example.com"]
}
```

The resulting configuration will be:

```json
{
  "configurationFile": "runtime",
  "disableConsole": false,
  "validHosts": ["localhost", "example.com"],
  "debugLevel": "trace"
}
```

This uses the [deepmerge](https://www.npmjs.com/package/deepmerge) module to do the merging of the configuration objects.

## Testing

To run the tests use the following command.

```bash
npm test
```

## Code Coverage

To run the coverage scanner and generate coverage report use the following command. It fails if the threshold coverage has not passed. The threshold settings are stored in the file `test/.istanbul.yml`.

```bash
npm run cover
```

## Linting

To run the linting checking run the following command.

```bash
npm run lint
```
