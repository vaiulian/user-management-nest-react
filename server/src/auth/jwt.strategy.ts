import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../utility/passportConfig';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: User) {
    const user = await this.usersService.findByUserName(payload.userName);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
