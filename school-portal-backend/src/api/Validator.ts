import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import HttpStatus from 'http-status';
import { Responder } from '.';

export class Validator {

  private readonly responder: Responder;

  constructor(responder: Responder) {
    this.responder = responder;
  }

  getHandleValidationMiddleware(): RequestHandler {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        this.responder.respondWithError(res, new Error(errors.array().map(err => `${err.param}: ${err.msg}`).join(', ')), HttpStatus.BAD_REQUEST);
        return;
      }
      next();
    };
  }

}
