
export class HttpError extends Error {
  message = "Server Error";
  status = 500;

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }

  toJSON() {
    return { message: this.message, status: this.status };
  }

  static is(e: unknown): e is HttpError {
    return e instanceof HttpError;
  }
}

export class NotFound extends HttpError {
  message = "Not Found";
  status = 404;
}

export class InvalidRequest extends HttpError {
  message = "Invalid Request";
  status = 400;
}
