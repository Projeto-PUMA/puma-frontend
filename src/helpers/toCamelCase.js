import _ from 'lodash';

const toCamelCase = (snakeCaseObject) => {
  const camelCaseObject = {};
  _.forEach(
    snakeCaseObject,
    (value, key) => {
      let newValue = value;
      if (_.isPlainObject(value) || _.isArray(value)) {
        newValue = toCamelCase(value);
      }
      camelCaseObject[_.camelCase(key)] = newValue;
    },
  );
  return camelCaseObject;
};

export default toCamelCase;
