import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { SystemException } from "../exception/system.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<Error> {

  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status != HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.warn(exception);
    } else {
      this.logger.error(exception);
    }

    if (exception instanceof SystemException) {
      response
        .status(status)
        .json({
          code: exception.getErrorCode(),
          message: exception.getErrorMessage(),
          data: {
            date: new Date().toISOString(),
            path: request.url
          }
        });
    } else {
      response
        .status(status)
        .json({
          code: "-1",
          message: exception.message,
          data: {
            date: new Date().toISOString(),
            path: request.url
          }
        });
    }
  }
}
