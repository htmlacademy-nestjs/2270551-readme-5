import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';


const SERVE_ROOT = '/static';

@Module({
  imports: [],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
