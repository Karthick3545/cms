import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import * as path from 'path';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  
  create(createDocumentDto: CreateDocumentDto) {
    return this.documentRepository.save(createDocumentDto);
  }

  async findAll() {
    return (await this.documentRepository.find()).map((e) => {
      return { ...e, name: path.join(process.env.DOMAIN,e.name)}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
