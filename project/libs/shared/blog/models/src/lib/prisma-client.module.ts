import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from '@project/libs/shared/blog/models';

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
