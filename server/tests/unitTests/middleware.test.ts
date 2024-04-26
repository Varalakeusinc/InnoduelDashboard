import { type Request, type Response } from 'express';
import { middleware } from '../../utils/middleware';
import jwt from 'jsonwebtoken';
import { logger } from '../../utils/logger';

jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

const createMockReq = (options = {}) =>
  ({
    method: 'GET',
    path: '/',
    body: {},
    cookies: { token: 'mockToken' },
    ...options
  } as unknown as Request);

const createMockRes = () => {
  const res: Partial<Response> = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Middleware Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('unknownEndpoint sends correct response', () => {
    const req = createMockReq();
    const res = createMockRes();

    middleware.unknownEndpoint(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: 'unknown endpoint' });
  });


  test('requestLogger should log request information', () => {
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    middleware.requestLogger(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledTimes(4);
    expect(logger.info).toHaveBeenCalledWith('Method:', 'GET');
    expect(logger.info).toHaveBeenCalledWith('Path:  ', '/');
    expect(logger.info).toHaveBeenCalledWith('Body:  ', {});
    expect(logger.info).toHaveBeenCalledWith('---');
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  test('errorHandler should handle CastError', () => {
    const error = new Error('CastError');
    error.name = 'CastError';
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    middleware.errorHandler(error, req, res, mockNext);

    expect(logger.error).toHaveBeenCalledWith('CastError');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'malformatted id' });
  });

  test('errorHandler should handle ValidationError', () => {
    const error = new Error('ValidationError');
    error.name = 'ValidationError';
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    middleware.errorHandler(error, req, res, mockNext);

    expect(logger.error).toHaveBeenCalledWith('ValidationError');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'ValidationError' });
  });

  test('errorHandler should call next for other errors', () => {
    const error = new Error('OtherError');
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    middleware.errorHandler(error, req, res, mockNext);

    expect(logger.error).toHaveBeenCalledWith('OtherError');
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  test('requireAuth should handle unauthorized user', () => {
    const req = createMockReq({ cookies: {} });
    const res = createMockRes();
    const mockNext = jest.fn();

    middleware.requireAuth(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledWith('User unauthorized, no token provided!');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });

  test('requireAuth should handle authorized user', () => {
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    jwt.verify = jest.fn().mockImplementation(() => ({ userId: 'mockUserId', isAdmin: false, companyId: 1 }));
    middleware.requireAuth(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledWith('User authorized.');
    expect(mockNext).toHaveBeenCalled();
  });

  test('requireAdmin should handle unauthorized non-admin user', () => {
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    jwt.verify = jest.fn().mockImplementation(() => ({ isAdmin: false }));
    middleware.requireAdmin(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledWith('requireAdmin: User unauthorized, not an admin!');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });

  test('requireAdmin should handle authorized admin user', () => {
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    jwt.verify = jest.fn().mockImplementation(() => ({ isAdmin: true }));
    middleware.requireAdmin(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledWith('requireAdmin: User is admin.');
    expect(mockNext).toHaveBeenCalled();
  });

  test('checkCompany should handle unauthorized user', () => {
    const req = createMockReq();
    const res = createMockRes();
    const mockNext = jest.fn();

    jwt.verify = jest.fn().mockImplementation(() => ({ isAdmin: false }));
    middleware.checkCompany(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledWith("checkCompany: User unauthorized, not correct company!");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });

  test('checkCompany should handle authorized user', () => {
    const req = createMockReq({ params: { companyId: '1' } });
    const res = createMockRes();
    const mockNext = jest.fn();

    jwt.verify = jest.fn().mockImplementation(() => ({ isAdmin: false, companyId: 1 }));
    middleware.checkCompany(req, res, mockNext);

    expect(logger.info).toHaveBeenCalledWith("checkCompany: Checking user company.");
    expect(mockNext).toHaveBeenCalled();
  });
});
