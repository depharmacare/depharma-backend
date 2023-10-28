import { Module } from '@nestjs/common';
import { DistributerService } from './distributer.service';
import { DistributerController } from './distributer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  controllers: [DistributerController],
  providers: [DistributerService],
})
export class DistributerModule {}
