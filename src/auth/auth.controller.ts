import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() userDetail: LoginUserDto) {
    console.log(userDetail);
    const user = await this.authService.validateUser(userDetail.email, userDetail.password);
    console.log(user);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/refresh-token')
  async refreshoken(@Request() req: any) {
    return this.authService.refreshoken(req.user);
  }
}
