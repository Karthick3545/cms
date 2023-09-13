import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  create(createContentDto: CreateContentDto) {
    return this.contentRepository.save({ ...createContentDto, isActive: true });
  }

  findAll() {
    return this.contentRepository.find();
  }

  findOne(id: number) {
    return this.contentRepository.findOne({ where: { id }});
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return this.contentRepository.update(id, updateContentDto);
  }

  remove(id: number) {
    return this.contentRepository.delete(id);
  }
}
