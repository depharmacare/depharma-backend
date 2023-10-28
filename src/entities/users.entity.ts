import { Users as UsersModel } from "@prisma/client";
import { Length, IsNotEmpty, IsEmail, Min } from 'class-validator'
import { Type } from "class-transformer";


export class UsersEntity implements UsersModel {
    id: string;

    @IsNotEmpty()
    @Length(5,20)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    createdAt: Date;
    updatedAt: Date;
}