# @myob-oss/config

A simple, predictable configuration module for Node.js applications.

This uses the environment variable NODE_ENV to determine which configuration file to load.

The module assumes that all the configuration files in JSON are in the `/config` folder at the top level of the project. The JSON files can have comments in them, as the module uses the [json5](https://www.npmjs.com/package/json5) module to parse the config files.

The module loads 3 configuration files in the following order (each overwrites the previous if they have the same key):

* default.json
* environment.json (where environment is taken from the NODE_ENV environment variable. It uses "production" as default if the environment variable is not set)
* runtime.json

Each configuration file will override values from the previous file. For example:

default.json
```json
{
  "foo": "bar",
  "hello": "there"
}
```

production.json
```json
{
  "my": "goodness"
}
```

runtime.json
```json
{
  "foo": "baz",
  "au": "revoir"
}
```

The resulting config will be:

```json
{
  "foo": "baz",
  "hello": "there",
  "au": "revoir",
  "my": "goodness"
}
```

This uses the [deepmerge](https://www.npmjs.com/package/deepmerge) module to do the merging of the configuration objects.

To use the module, you simply require it, and it exposes the configuration as an Object.

```js
const config = require('@myob-oss/config');

console.log(config.foo); // prints "baz" from the example above.
```

## Testing

To run the tests use the following command.

```bash
npm test
```

## Code Coverage

To run the coverage scanner and generate coverage report use the following command. It fails if the threshold coverage has not passed. The threshold settings are stored in `test/.istanbul.yml`.

```bash
npm run cover
```

## Linting

To run the linting checking run the following command.

```bash
npm run lint
```
