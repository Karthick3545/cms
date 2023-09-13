import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { ChangeCompanyIdDto } from './dto/change-company-id.dto';
import { AssignRoleIdDto } from './dto/assign-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save({...createUserDto, isActive: true});
  }

  update(updateUserDto: UpdateUserDto, userId: number) {
    return this.userRepository.update(userId, updateUserDto);
  }

  show(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }

  getCompany(companyId: number) {
    return this.userRepository.find({ where: { companyId } });
  }

  async setCompany(updateCompanyId: ChangeCompanyIdDto, id: number){
    const user = await this.show(id);
    if(user){
      return this.userRepository.update(id, {...user, companyId: updateCompanyId.company_id });
    }
    return {"message": "User not found"};
  }

  async assignRole(assignRoleIdDto: AssignRoleIdDto, id: number){
    const user = await this.show(id);
    if(user){
      return this.userRepository.update(id, {...user, role: assignRoleIdDto.role });
    }
    return {"message": "User not found"};
  }
}
