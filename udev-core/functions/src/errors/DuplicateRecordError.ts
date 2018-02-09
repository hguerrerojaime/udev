import { HttpError } from 'udev-mvc-ts';

export class DuplicateRecordError extends HttpError {
  constructor(message:string = "Record must be unique") {
    super(message,409);
  }
}
