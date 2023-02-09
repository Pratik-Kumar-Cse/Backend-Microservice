import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string) {

        try {
            const user = await this.userService.findOne(username);
            const valid = await bcrypt.compare(password, user.password);
            if (user && valid) {
                return user;
            }
            return null;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async login(user: LoginUserDto) {
        try {
            const userReturn = await this.userService.findOne(user.username);
            const data = {
                username: user.username
            };
            const access_token = this.jwtService.sign(data, { secret: process.env.JWT_SECRET });
            return {
                accessToken: access_token,
                user: userReturn,
                status: true
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signup(loginUserDto: LoginUserDto) {
        const user1 = await this.userService.findOne(loginUserDto.username);
        if (user1) {
            throw new Error('user already exists');
        }

        const password = await bcrypt.hash(loginUserDto.password, 10);
        const user = await this.userService.createAccount({
            ...loginUserDto,
            password
        });

        return { user, status: true };
    }
}
