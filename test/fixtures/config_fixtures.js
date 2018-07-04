function generateDefaultConfig(options) {
  if (options) {
    return options;
  }

  return {
    configurationFile: 'default',
    an_array: [1, 2, 3, 4],
    an_object: {
      property1: 'value1',
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
    configurationFile: 'environment',
    a_string: 'trainy mctrainface',
    an_array: [4, 5],
    a_variant: ['an', 'array'],
  };
}

function generateRuntimeConfig(options) {
  if (options) {
    return options;
  }

  return {
    configurationFile: 'runtime',
    an_object: {
      property1: 'value2',
      another: 'property',
    },
    a_variant: {
      an: 'object',
    },
  };
}

module.exports = {
  generateDefaultConfig,
  generateEnvironmentConfig,
  generateRuntimeConfig,
};
