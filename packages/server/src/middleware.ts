import { NextFunction, Request, Response } from 'express'

/**
 * middleware to return the error in json format when unauthorized
 * requests are received
 */
export const unauthorisedErrorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => Response | void = (
  error,
  _,
  res,
  next,
) => {
  if (error.name === 'UnauthorizedError') {
    return res.status(403).json({ error: error.message })
  }
  // tslint:disable-next-line: no-void-expression
  return next()
}
