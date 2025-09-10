import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  status_code: number;
  message: string;
  request_id: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        status_code: context.switchToHttp().getResponse().statusCode,
        request_id: context.switchToHttp().getRequest().reqId,
        message: data?.message || 'ok',
        data: data || {},
      })),
    );
  }
}
