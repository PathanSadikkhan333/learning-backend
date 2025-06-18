

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors; // corrected variable name

    if (stack) {
      this.stack = stack; // fixed typo from statck to stack
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
