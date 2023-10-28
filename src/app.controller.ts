import { Controller, Get, Post, Body, Request, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGaurd } from './auth/local-auth.gaurd';
import { JwtAuthGaurd } from './auth/jwt-auth.gaurd';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-users.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGaurd)
  @Post('login')
  Login(@Request() req): any {
    // return { message: 'logged in!', user: req.user }
    return this.authService.login(req.user)
  }

  @Post('signup')
  SignUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }


  @Get('forget-password/:email')
  async sendEmailFOrgetPassword(@Param() params): Promise<any> {
    return this.authService.forgetPasswordEmail(params.email)
  }

  @UseGuards(JwtAuthGaurd)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
