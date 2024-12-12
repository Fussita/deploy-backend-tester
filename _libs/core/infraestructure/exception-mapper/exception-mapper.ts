import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceptionMapper {
  
  static formatException(error: Error): Error {
    switch (error.constructor) {

      //case (EmailNotRegisteredException): return new HttpException(error.message, 410)
      
      default: return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }
}