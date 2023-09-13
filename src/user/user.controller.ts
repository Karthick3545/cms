import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards, Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ChangeCompanyIdDto } from './dto/change-company-id.dto';
import { AssignRoleIdDto } from './dto/assign-role.dto';
import { RoleGuard } from 'src/auth/role.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { log } from 'console';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Permissions('listUser')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get()
  getUsers(@Request() req: any) {
    console.log(req.user);
    if(req.user.company != 0){
      return this.userService.getCompany(req.user.company);
    }
    return this.userService.get();
  }

  @Permissions('createUser')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Permissions('updateUser')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Patch('/:userId')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.update(updateUserDto, userId);
  }

  @Permissions('listUser')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.show(userId);
  }

  @Permissions('deleteUser')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }

  @Permissions('setCompany')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Put('/set-company/:userId')
  setCompany(@Body() changeCompanyIdDto: ChangeCompanyIdDto, @Param('userId', ParseIntPipe) userId: number) {
    return this.userService.setCompany(changeCompanyIdDto, userId);
  }
  
  @Permissions('assignRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Put('/assign-role/:userId')
  assignRole(@Body() assignRoleIdDto: AssignRoleIdDto, @Param('userId', ParseIntPipe) userId: number) {
    return this.userService.assignRole(assignRoleIdDto, userId);
  }
}
