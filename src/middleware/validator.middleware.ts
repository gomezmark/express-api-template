import Boom from "@hapi/boom";
import * as Joi from "@hapi/joi";
// const Joi = require('@hapi/joi');
import { Request, Response, NextFunction } from "express";
import { isObject as _isObject } from "lodash";

interface ValidationRequest extends Request {
  body: any;
}

export const validate = (requestSchema: any, req: ValidationRequest, res: Response, next: NextFunction) => {
  const validations = ["headers", "params", "query", "body", "file", "files"].map((key: string) => {
    const schema = (requestSchema)[key];
    const value = (req as any)[key];
    const validate = () => schema ? schema.validateAsync(value, { context: req.headers, abortEarly: false }) : Promise.resolve({});
    return validate().then((result: any) => ({ [key]: result }));
  });

  return Promise.all(validations)
    .then((results) => {
      for (const result of results) {
        const propName = Object.keys(result)[0];
        const newObject = result[propName];

        if (_isObject(newObject) && Object.keys(newObject).length) {
          (req as any)[propName] = newObject;
        }
      }

        next();
    })
    .catch((validationError: any) => {
        const error = new Boom("validation_errors", { statusCode: 400 });
        (error.output.payload as any).validations = validationError.details.map((d: any) => {
            return {
                message: d.message.replace(/"/g, "`"),
                field: d.context.key,
            };
        });
        next(error);
    });
}

export const MessageSchema = {
  body: Joi.object({
    message: Joi.required()
  })
};

export const DeleteMessageSchema = {
  body: Joi.object({
    id: Joi.required()
  })
};
