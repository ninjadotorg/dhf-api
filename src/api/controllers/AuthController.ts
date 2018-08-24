import { Body, JsonController, Post } from 'routing-controllers';

import { AuthService } from '../../auth/AuthService';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { RoleService } from '../services/RoleService';
import { UserService } from '../services/UserService';
import { SignInRequest } from './requests/SignInRequest';
import { AuthResponse } from './responses/AuthResponse';

@JsonController('/auth')
export class AuthController {
    private maxAge = 7200;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private roleService: RoleService
    ) { }

    @Post('/sign-up')
    public signUp( @Body() user: User): Promise<AuthResponse> {
        console.log('[DEBUG]', user);
        return new Promise(async (resolve, reject) => {
            user.password = this.authService.generatePassword(user.password);
            const role = await this.roleService.findByName(Role.Roles.User);
            user.roleId = role.id;
            const newUser = await this.userService.create(user);
            const token = this.authService.generateToken({ user_id: newUser.id, role: role.name }, this.maxAge);
            const response = new AuthResponse();
            response.token = token;
            response.expired = this.maxAge;
            response.user = await this.userService.findById(newUser.id);
            return resolve(response);
        });
    }

    @Post('/sign-in')
    public signIn( @Body() req: SignInRequest): Promise<AuthResponse> {
        console.log(req);
        return new Promise(async (resolve, reject) => {
            const user = await this.userService.findByEmail(req.email);

            if (!this.authService.verifyPassword(req.password, user.password)) {
                return reject(new Error('Invalid password!!!'));
            }

            const token = this.authService.generateToken({ user_id: user.id, role: user.role.name }, this.maxAge);
            const response = new AuthResponse();
            response.token = token;
            response.expired = this.maxAge;
            response.user = user;
            return resolve(response);
        });
    }

}
