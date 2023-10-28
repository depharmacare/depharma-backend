import { Users as UsersModel } from "@prisma/client";
import { Length, IsNotEmpty, IsEmail, Min, Max, IsString, MinLength, Matches } from 'class-validator'
import { Type } from "class-transformer";


export class UsersEntity implements UsersModel {
    id: string;

    @IsNotEmpty()
    @Length(5, 20)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]*$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    })
    password: string;
    createdAt: Date;
    updatedAt: Date;
}