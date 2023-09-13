import { Injectable } from '@nestjs/common';
import { CreateMacidDto } from './dto/create-macid.dto';
import { UpdateMacidDto } from './dto/update-macid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Macid } from './entities/macid.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class MacidsService {
  constructor(
    @InjectRepository(Macid)
    private mackIdRepository: Repository<Macid>,
    private readonly companyService: CompanyService
  ) {}
  
  create(createMacidDto: any) {
    return this.mackIdRepository.save({ ...createMacidDto, isActive: false });;
  }

  findAll(companyId:number) {
    return this.mackIdRepository.find({ where: {companyId} });
  }

  findOne(id: number) {
    return this.mackIdRepository.findOne({ where: {id} });
  }

  update(id: number, updateMacidDto: UpdateMacidDto) {
    return this.mackIdRepository.update(id, updateMacidDto);
  }

  remove(id: number) {
    return this.mackIdRepository.delete(id);
  }

  async activeDevice(macId: string) {
    const mac = await this.mackIdRepository.findOne({ where:{ macId } });

    await this.mackIdRepository.update(mac.id, { isActive: true });

    return {
      device: await this.mackIdRepository.findOne({ where:{ macId } }),
      tenant: await this.companyService.findOne(mac.companyId)
    }
  }
}
