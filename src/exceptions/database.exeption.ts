import {HttpException, HttpStatus} from "@nestjs/common";

export class DatabaseException extends HttpException {
    messages;

    constructor(response, httpStatus?) {
        super(response, httpStatus || HttpStatus.INTERNAL_SERVER_ERROR);
        this.messages = response;
    }
}
