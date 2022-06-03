import axios from 'axios';
import { Console } from 'console';

const appName = 'joemrk-binance-node';
const appVersion = '1';

export const isEmptyValue = (input) => {
  return (
    (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) &&
      /^\s+$/.test(input.toString())) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
  );
};

export const removeEmptyValue = (obj) => {
  if (!(obj instanceof Object)) return {};
  Object.keys(obj).forEach((key) => isEmptyValue(obj[key]) && delete obj[key]);
  return obj;
};

export const flowRight =
  (...functions) =>
  (input) =>
    functions.reduceRight((input, fn) => fn(input), input);

export const buildQueryString = (params) => {
  if (!params) return '';
  return Object.entries(params).map(stringifyKeyValuePair).join('&');
};

export const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value;
  return `${key}=${encodeURIComponent(valueString)}`;
};

export const getRequestInstance = (config) => {
  return axios.create({
    ...config,
  });
};

export const createRequest = (config) => {
  const { baseURL, apiKey, method, url } = config;
  return getRequestInstance({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'X-MBX-APIKEY': apiKey,
      'User-Agent': `${appName}/${appVersion}`,
    },
  }).request({
    method,
    url,
  });
};

export const defaultLogger = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
});
