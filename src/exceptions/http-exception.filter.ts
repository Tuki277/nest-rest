import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

interface ErrorResponse {
  success: boolean;
  status_code: number;
  path: string;
  message: string[];
}

@Catch(
  HttpException,
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly errorStatusMap: Record<string, HttpStatus> = {
    QueryFailedError: HttpStatus.UNPROCESSABLE_ENTITY,
    EntityNotFoundError: HttpStatus.UNPROCESSABLE_ENTITY,
    CannotCreateEntityIdMapError: HttpStatus.UNPROCESSABLE_ENTITY,
  };

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = this.handleException(exception);
    const errorResponse: ErrorResponse = {
      success: false,
      status_code: status,
      path: request.url,
      message,
    };

    response.status(status).json(errorResponse);
  }

  private handleException(exception: unknown): {
    status: number;
    message: string[];
  } {
    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: this.extractHttpExceptionMessage(exception),
      };
    }

    const exceptionName = (exception as any)?.constructor?.name;
    const status =
      this.errorStatusMap[exceptionName] || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as any)?.message || 'Internal server error';

    return {
      status,
      message: Array.isArray(message) ? message : [message],
    };
  }

  private extractHttpExceptionMessage(exception: HttpException): string[] {
    const response = exception.getResponse();
    const message =
      typeof response === 'object' && 'message' in response
        ? response.message
        : exception.message;

    // Ensure the message is always a string array
    return Array.isArray(message) ? message : [message as string];
  }
}
