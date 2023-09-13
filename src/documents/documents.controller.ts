import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFloatPipe, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Permissions } from 'src/auth/permissions.decorator';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Permissions('createDocument')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        cb(null, currentTime())
      }
    })
  }))
  create(@UploadedFile(
    // @UploadedFile(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1000}),
      //     new FileTypeValidator({ fileType: 'image/jpeg' }),
      //   ]
      // }),
    // )
  ) file:Express.Multer.File) {
    console.log(file);
    const data = {
      name: file.filename
    };
    
    return this.documentsService.create(data);
  }

  @Permissions('listDocument')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}

function currentTime() {
  let date = new Date()
  let a = date.getFullYear()
  let b = date.getMonth()+1 // JS months are 0 indexed, 0 = January, 11 = December
  let c = date.getDate()

  let d = date.getHours()
  let e = date.getMinutes()
  let f = date.getSeconds()

  return a+''+b+''+c+''+d+''+e+''+f+'.png';
}