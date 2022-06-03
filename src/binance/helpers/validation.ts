import { isEmptyValue } from './utils';
import { MissingParameterError } from './error';

export const validateRequiredParameters = (paramObject) => {
  if (!paramObject || isEmptyValue(paramObject)) {
    throw new MissingParameterError(paramObject);
  }
  const emptyParams = [];
  Object.keys(paramObject).forEach((param) => {
    if (isEmptyValue(paramObject[param])) {
      emptyParams.push(param);
    }
  });
  if (emptyParams.length) {
    throw new MissingParameterError(emptyParams);
  }
};

export const hasOneOfParameters = (paramObject) => {
  if (!paramObject || isEmptyValue(paramObject)) {
    throw new MissingParameterError(paramObject);
  }
  const params = Object.values(paramObject);
  if (params.every(isEmptyValue)) {
    throw new MissingParameterError(Object.keys(paramObject));
  }
};
