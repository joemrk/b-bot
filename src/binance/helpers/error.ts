export class Error {
  message;
  name;

  constructor(message) {
    this.message = message;
    this.name = 'Error';
  }
}

export class MissingParameterError extends Error {
  paramNames?;
  constructor(paramNames) {
    super(
      `One or more of required parameters is missing: ${
        paramNames ? paramNames.slice().join(', ') : ''
      } `,
    );
    this.name = 'MissingParameterError';
  }
}
