import { Module } from '@nestjs/common';
import { InventoryByCategoryService } from './inventory-by-category.service';
import { InventoryByCategoryController } from './inventory-by-category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryByCategoryController],
  providers: [InventoryByCategoryService],
})
export class InventoryByCategoryModule { }
