import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private roleServices: RoleService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    
    console.log(user.password,password);
    
    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async getToken(payload: any){
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(
        payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
      user:payload,
      success:true,
      message:"Successfully",
      role: await this.roleServices.findName(payload.role)
    };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name, role: user.role, companyId: user.companyId };
    return this.getToken(payload);
  }

  async refreshoken(user: any){
    const payload = { email: user.email, sub: user.id, name: user.name, role: user.role };
    return this.getToken(payload);
  }
}
