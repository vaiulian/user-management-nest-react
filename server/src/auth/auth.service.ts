import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { Logger } from '@nestjs/common';
import config from '../utility/passportConfig';

import * as passwordManager from '../utility/passwordManager';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }
    private readonly logger = new Logger(AuthService.name);

    public async validate(data: User): Promise<User> {
        const user = await this.userService.findByUserName(data.userName);
        if (!passwordManager.isPasswordOk(data.password, user.password)) {
            this.logger.error('Password is not OK for userName ' + user.userName);
            throw new UnauthorizedException();
        }

        return user;
    }

    public async login(user: User): Promise<any> {
        return this.validate(user).then((userData: User) => {
          if (!userData) {
            throw new NotFoundException();
          }
          const payload = { id: userData.id,
            userName: userData.userName,
            firstname: userData.firstName,
            lastName: userData.lastName,
        };
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: config.EXPIRES_IN,
             access_token: accessToken,
             user: payload,
             status: 200,
          };

        });
    }

    public async register(user: User): Promise<any> {
        return this.userService.addUser(user);
    }
}
