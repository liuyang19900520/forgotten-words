import { HttpException, HttpStatus } from "@nestjs/common";

export class SystemException extends HttpException {
  private readonly errorMessage: string;
  private readonly errorCode: string;

  constructor(errorMessage: string, errorCode?: string, statusCode?: HttpStatus) {
    if (!errorCode) {
      errorCode = "-1";
    }
    if (!statusCode) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
