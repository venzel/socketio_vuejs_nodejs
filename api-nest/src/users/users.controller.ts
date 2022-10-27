import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get('/users')
    handle() {
        this.userService.execute();
    }
}
