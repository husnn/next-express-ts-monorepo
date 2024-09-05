import HttpError from './HttpError';

export class DuplicateError extends HttpError {
  constructor(message?: string, status?: number) {
    super(message || 'Resource already exists.', status || 400);
  }
}

export default DuplicateError;
