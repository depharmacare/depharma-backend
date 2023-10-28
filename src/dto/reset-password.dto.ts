import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

export class ResetPasswordDto {
    @IsNotEmpty()
    token: string;
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]*$/, {
        message: 'New Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    })
    newPassword: string;
}