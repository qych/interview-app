import { Response } from 'express';
import HttpStatus from 'http-status';
import { ApiResWrapper } from 'school-portal-common';

export class Responder {

  getAutoRespondDecorator(): MethodDecorator {
    return ((target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      descriptor.value = (async (req: Request, res: Response) => {
        try {
          const result = await originalMethod(req, res);
          if (result) {
            this.respondWithData(res, result);
          } else {
            this.respondWithoutData(res);
          }
        } catch (err) {
          this.respondWithError(res, err);
        }
      }) as any;
    }) as any;
  }

  respondWithData<T>(res: Response, data: T) {
    try {
      const output: ApiResWrapper<T> = { data };

      res.status(HttpStatus.OK);
      res.json(output);
      res.end();

    } catch (err) {
      this.respondWithError(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  respondWithoutData(res: Response) {
    try {
      res.status(HttpStatus.CREATED);
      res.json({});
      res.end();

    } catch (err) {
      this.respondWithError(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  respondWithError(res: Response, err: Error, httpStatus?: number) {
    try {
      let error: string;

      if (!httpStatus) {
        httpStatus = HttpStatus.BAD_REQUEST;
      }

      error = err.message;

      const output: ApiResWrapper = { error, data: undefined as any };

      res.status(httpStatus);
      res.json(output);
      res.end();

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.end();
    }
  }
}