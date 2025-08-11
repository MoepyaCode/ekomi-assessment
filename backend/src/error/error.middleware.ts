import { NextFunction, Request, Response } from "express"

export function errorHandler(err: any, request: Request, response: Response, next: NextFunction) {
    response.status(500).send({ error: err.message })
}