export class WrappedError extends Error {
  constructor(err: Error, additional?: Error | string) {
    super();

    this.name = Error.name;
    this.message = `${
      additional instanceof Error ? additional.message : additional
    } ${err.message}`;
    this.stack = err.stack;
    this.cause = err.cause;
  }

  static from(err: Error, additional?: Error | string): WrappedError {
    return new WrappedError(err, additional);
  }
}
