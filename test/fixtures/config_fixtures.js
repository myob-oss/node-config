function generateDefaultConfig(options) {
  if (options) {
    return options;
  }

  return {
    which: 'default',
    an_array: [1, 2, 3, 4],
    an_object: {
      foo: 'bar',
    },
    a_number: 1,
    a_string: 'boaty mcboatface',
    a_variant: 'string',
  };
}

function generateEnvironmentConfig(options) {
  if (options) {
    return options;
  }

  return {
    which: 'environment',
    a_string: 'trainy mctrainface',
    an_array: [4, 5],
    a_variant: ['how', 'zat'],
  };
}

function generateRuntimeConfig(options) {
  if (options) {
    return options;
  }

  return {
    which: 'runtime',
    an_object: {
      foo: 'baz',
      thing: 'amajig',
    },
    a_variant: {
      how: 'zat',
    },
  };
}

module.exports = {
  generateDefaultConfig,
  generateEnvironmentConfig,
  generateRuntimeConfig,
};
