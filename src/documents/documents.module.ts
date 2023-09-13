import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [TypeOrmModule.forFeature([Document])],
})
export class DocumentsModule {}
