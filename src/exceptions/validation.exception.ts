import {HttpException, HttpStatus} from "@nestjs/common";

export class ValidationException extends HttpException {
    messages;

    constructor(response, httpStatus?) {
        super(response, httpStatus || HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}
