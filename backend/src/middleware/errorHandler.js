import { logger } from '../config/logger.js';
import { ZodError } from 'zod';

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: err.flatten().fieldErrors,
      },
    });
  }

  if (err.name === 'UnauthorizedError' || err.status === 401) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
        details: {},
      },
    });
  }

  if (err.name === 'ForbiddenError' || err.status === 403) {
    return res.status(403).json({
      error: {
        code: 'FORBIDDEN',
        message: 'Access denied',
        details: {},
      },
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({
      error: {
        code: 'CONFLICT',
        message: 'Resource already exists',
        details: { constraint: err.constraint },
      },
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: {
        code: 'FOREIGN_KEY_VIOLATION',
        message: 'Referenced resource does not exist',
        details: { constraint: err.constraint },
      },
    });
  }

  if (err.code === '23514') {
    return res.status(400).json({
      error: {
        code: 'CHECK_VIOLATION',
        message: 'Data violates a constraint',
        details: { constraint: err.constraint },
      },
    });
  }

  logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');

  const status = err.status || err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;

  res.status(status).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message,
      details: {},
    },
  });
}