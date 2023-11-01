import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../dto/create-users.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async findOne(email: any) {
        const user = await this.prismaService.users.findUnique({
            where: {
                email: email
            }
        })

        return user
    }


    async createUser(createUserDto: CreateUserDto) {
        try {
            const { username, email, password } = createUserDto;
            const saltOrRounds = 10;

            // Check if already user exists with the email
            const userExists = await this.prismaService.users.findUnique({
                where: { email }
            })

            if (userExists) {
                throw new HttpException(`email already exists ${email}`, HttpStatus.CONFLICT)
            }

            const hashedPassword = await bcrypt.hash(password, saltOrRounds)

            const createUser = await this.prismaService.users.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
            })


            if (!createUser) {
                throw new HttpException('error creating a user', HttpStatus.UNPROCESSABLE_ENTITY)
            }

            return { message: 'user created successfullt', createUser }


        } catch (error) {
            throw new HttpException(
                error.response ? error.response : 'Something went wrong',
                error.status ? error.status : HttpStatus.BAD_REQUEST
            )
        }
    }

    async generatedTokenForgotPassword(email: any) {
        const token = (Math.floor(Math.random() * 9000000) + 1000000).toString()

        const existingRequest = await this.prismaService.forgotPasswordRequests.findFirst({ where: { email: email } });

        if (existingRequest) {
            return this.prismaService.forgotPasswordRequests.update({ where: { email: email }, data: { token: token } });
        }


        // User does not exist, create a new document
        return this.prismaService.forgotPasswordRequests.create({ data: { email: email, token: token } });
    }
    
    async findByEmail(email: any) {
        const user = await this.prismaService.users.findUnique({
            where: { email }
        })

        return user
    }
}
