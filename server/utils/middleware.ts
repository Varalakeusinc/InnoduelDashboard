import { logger } from './logger';
import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body as string);
  logger.info('---');
  next();
};

const unknownEndpoint = (request: Request, response: Response) => {
  response.send({ message: 'unknown endpoint' });
};

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ message: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message });
  }

  next(error);
};

const requireAuth = (request: Request, response: Response, next: NextFunction) => {
  const { cookies } = request;
  logger.info("Checking is user authorized.");
  if (!cookies || !cookies.token) {
    logger.info("User unauthorized, no token provided!");
    return response.status(401).send('Unauthorized');
  }
  try {
    jwt.verify(cookies.token, process.env.JWT_SECRET as string);
    logger.info("User authorized.");
    next();
  } catch (error) {
    logger.info("User unauthorized, invalid cookie!");
    response.status(401).send('Unauthorized');
  }
};

const requireAdmin = (request: Request, response: Response, next: NextFunction) => {
  logger.info("requireAdmin: Checking is user admin.");
  const { cookies } = request;
  try {
    const decodedToken = jwt.verify(cookies.token, process.env.JWT_SECRET as string) as { userId: string, isAdmin: boolean, companyId: number };
    if (decodedToken?.isAdmin) {
      logger.info("requireAdmin: User is admin.");
      next();
    } else {
      logger.info("requireAdmin: User unauthorized, not an admin!");
      return response.status(401).send('Unauthorized');
    }
  } catch (error) {
    logger.info("requireAdmin: User unauthorized, not an admin!");
    return response.status(401).send('Unauthorized');
  }

}

const checkCompany = (request: Request, response: Response, next: NextFunction) => {
  logger.info("checkCompany: Checking user company.");
  const { cookies } = request;
  try {
    const decodedToken = jwt.verify(cookies.token, process.env.JWT_SECRET as string) as { userId: string, isAdmin: boolean, companyId: number };
    if (decodedToken?.isAdmin) {
      next();
    }
    if (decodedToken?.companyId === Number(request.params.companyId)) {
      next();
    } else {
      return response.status(401).send('Unauthorized');
    }
  } catch (error) {
    logger.info("checkCompany: User unauthorized, not correct company!");
    return response.status(401).send('Unauthorized');
  }

}

export const middleware = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  requireAuth,
  requireAdmin,
  checkCompany
};
