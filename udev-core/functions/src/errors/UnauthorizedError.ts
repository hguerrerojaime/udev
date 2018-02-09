import { HttpError } from 'udev-mvc-ts';

export class UnauthorizedError extends HttpError {
  constructor(message:string = "Operation is not Authorized") {
    super(message,401);
  }
}
