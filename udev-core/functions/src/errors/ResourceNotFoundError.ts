import { HttpError } from 'udev-mvc-ts';

export class ResourceNotFoundError extends HttpError {
  constructor() {
    super("Resource Not Found",404);
  }
}
