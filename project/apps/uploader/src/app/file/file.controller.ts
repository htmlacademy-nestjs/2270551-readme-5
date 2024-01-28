import 'multer';
import { Express } from 'express';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

//import { FileUploaderService } from './file-uploader.service';
//import { MongoIdValidationPipe } from '@project/shared/core';
//import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
//import { fillDto } from '@project/shared/helpers';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.writeFile (file);
  }
}
