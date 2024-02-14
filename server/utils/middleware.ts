import { logger } from './logger'
import { type Request, type Response, type NextFunction } from 'express'

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.send({ message: 'unknown endpoint' })
}

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ message: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message })
  }

  next(error)
}

export const middleware = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
