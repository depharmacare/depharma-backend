import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/dto/create-users.dto';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService) { }




    async validateUser(email: any, password: string): Promise<any> {
        const user = await this.userService.findOne(email)
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)

            if (passwordMatch) {
                const { email, password, ...rest } = user
                return rest
            }

            return null
        }


        return null
    }

    async login(user: any) {
        const payload = { name: user.username, sub: user.id }
        return {
            message: 'logged in !',
            access_token: this.jwtService.sign(payload),
            user
        }
    }

    async signup(createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto)
    }

    async forgetPasswordEmail(email: any) {
        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new HttpException(`User not found ${email}`, HttpStatus.NOT_FOUND)
        }


        const generatedTokenForgotPassword = await this.userService.generatedTokenForgotPassword(user.email)




        return generatedTokenForgotPassword
    }
}
