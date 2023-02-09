import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  // async validate(payload: JwtPayload): Promise<User> {
  //   const { username } = payload;
  //   const user: User = await this.usersRepository.findOne({
  //     where: { username },
  //   });
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  //   //return this.usersRepository.findOne({ username: payload.username });
  // }
}

