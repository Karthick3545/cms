import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/interface';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Permissions } from 'src/auth/permissions.decorator';

@Controller('profile')
export class ProfileController {
  // @Roles(Role.Admin,Role.Employee)
  @Permissions('userProfile')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get()
  profile(@Request() req: any) {
    return req.user;
  }


  @Permissions('listUser')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get('/user')
  userProfile(@Request() req: any) {
    return {...req.user, message: 'Success'};
  }
}
