import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isBoom) {
    return res.send({
      statusCode: err.output.statusCode,
      message: err.output.payload.message,
      validations: err.output.payload.validations ? err.output.payload.validations.map((error: any) => error.message) : undefined,
      raw: process.env.MODE === "development" && err.output.payload.raw ? err.output.payload.raw : undefined
    })
  } else {
    // Using native console log
    console.log(err)
  }
};

export default errorHandler;