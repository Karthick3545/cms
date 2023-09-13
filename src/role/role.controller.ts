import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Permissions } from 'src/auth/permissions.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions('createRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Permissions('listRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Permissions('listRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get('/permission/list')
  permissionList() {
    return this.roleService.permissionList();
  }

  @Permissions('listRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Permissions('updateRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Permissions('deleteRole')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
