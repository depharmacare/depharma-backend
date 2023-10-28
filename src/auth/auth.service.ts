import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/dto/create-users.dto';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
        private prismaService: PrismaService
    ) { }




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

    async forgetPasswordRequest(email: any) {
        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new HttpException(`User not found ${email}`, HttpStatus.NOT_FOUND)
        }


        const generatedTokenForgotPassword = await this.userService.generatedTokenForgotPassword(user.email)

        return { message: 'request successful', token: generatedTokenForgotPassword.token }
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const saltOrRounds = 10;
        const { token, oldPassword, newPassword } = resetPasswordDto

        // Check token validity
        const validToken = await this.prismaService.forgotPasswordRequests.findFirst({
            where: {
                token: token
            }
        })


        if (!validToken) throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);


        // Check Old Password valid
        const user = await this.userService.findByEmail(validToken.email)
        const oldPasswordValid = await bcrypt.compare(oldPassword, user.password)


        if (!oldPasswordValid) throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);



        const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds)
        const updatePassword = await this.prismaService.users.update({
            where: { email: user.email },
            data: { password: hashedPassword }
        })



        return { message: 'password updated successfully', updatePassword }
    }
}
