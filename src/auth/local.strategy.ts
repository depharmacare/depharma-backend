import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email', // Use 'email' as the username field
        }); //config of strategy
    }

    async validate(email: any, password: string): Promise<any> {
        console.log(email,password)
        const user = await this.authService.validateUser(email, password)


        if (!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}