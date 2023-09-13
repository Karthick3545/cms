import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { MacidsService } from './macids.service';
import { CreateMacidDto } from './dto/create-macid.dto';
import { UpdateMacidDto } from './dto/update-macid.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Permissions } from 'src/auth/permissions.decorator';

@Controller('macids')
export class MacidsController {
  constructor(private readonly macidsService: MacidsService) {}

  @Permissions('createMacId')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Post()
  create(@Body() createMacidDto: CreateMacidDto, @Request() req: any) {
    if(req.user.company == 0){
      return { message: 'Sorry! You are not Comapny Admin...', status: 404 }
    }
    return this.macidsService.create({...createMacidDto, companyId: req.user.company});
  }

  @Permissions('listMacId')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.macidsService.findAll(req.user.company);
  }

  @Permissions('listMacId')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.macidsService.findOne(+id);
  }

  @Permissions('updateMacId')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMacidDto: UpdateMacidDto) {
    return this.macidsService.update(+id, updateMacidDto);
  }

  @Permissions('deleteMacId')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.macidsService.remove(+id);
  }

  @Put('active')
  activeDevice(@Body() macId: any) {
    return this.macidsService.activeDevice(macId.macId);
  }
}
