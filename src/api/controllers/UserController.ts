import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Authorized(Role.Roles.User)
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    public find( @CurrentUser() user?: User): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one( @Param('id') id: number): Promise<User | undefined> {
        return this.userService.findById(id);
    }

    @Post()
    public create( @Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put('/:id')
    public update( @Param('id') id: number, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete( @Param('id') id: number): Promise<User> {
        return this.userService.delete(id);
    }

}
