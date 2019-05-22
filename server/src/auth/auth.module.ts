import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import config from '../utility/passportConfig';

@Module({
    imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secretOrPrivateKey: config.JWT_SECRET,
        signOptions: {
          expiresIn: config.EXPIRES_IN,
        },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [UsersService, AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
