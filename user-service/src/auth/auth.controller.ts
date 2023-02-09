import { Controller, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';
import { Context } from '@nestjs/graphql';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private localStrategy: LocalStrategy
    ) {

    }

    @GrpcMethod('UserService', 'login')
    async login(loginUserDto: LoginUserDto) {
        this.localStrategy.validate(loginUserDto.username, loginUserDto.password);
        const response = await this.authService.login(loginUserDto);
        return response;
    }

    @GrpcMethod('UserService', 'signup')
    signup(loginUserDto: LoginUserDto) {
        return this.authService.signup(loginUserDto);
    }

    @GrpcMethod('UserService', 'getProfile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        console.log("hello");
        console.log(req.user)
        return req.user;
    }
}
