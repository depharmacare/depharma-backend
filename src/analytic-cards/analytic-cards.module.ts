import { Module } from '@nestjs/common';
import { AnalyticCardsController } from './analytic-cards.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AnalyticCardsService } from './analytic-cards.service';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticCardsController],
  providers: [AnalyticCardsService]
})
export class AnalyticCardsModule { }
