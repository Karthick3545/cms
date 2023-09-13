import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/auth/permissions.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Permissions('createCompany')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Permissions('listCompany')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Permissions('listCompany')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Permissions('updateCompany')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Permissions('deleteCompany')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
