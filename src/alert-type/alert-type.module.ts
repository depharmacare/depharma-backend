import { Module } from '@nestjs/common';
import { AlertTypeService } from './alert-type.service';
import { AlertTypeController } from './alert-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AlertTypeService],
  controllers: [AlertTypeController]
})
export class AlertTypeModule { }
