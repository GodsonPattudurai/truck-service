import { UserService } from "src/user/users.service";
import { Post, Body, Get, Controller } from "@nestjs/common";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async addUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string
        ) {
        const generatedId = await this.userService.insertUser(firstName, lastName);
        return { id: generatedId };
    }

    @Get()
    async getUsers() {
        const users = await this.userService.getUsers();
        return users;
    }


}