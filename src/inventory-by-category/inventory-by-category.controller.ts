import { Controller, Get, Post, Body, Patch, Param, Delete , Query} from '@nestjs/common';
import { InventoryByCategoryService } from './inventory-by-category.service';

@Controller('inventory-by-category')
export class InventoryByCategoryController {
  constructor(private readonly inventoryByCategoryService: InventoryByCategoryService) { }


  @Get(':id')
  getInventoryByCategoryId(
    @Param('id') id: string,
    @Query('page') page: number,
  ) {
    return this.inventoryByCategoryService.getInventoryByCategoryId(id, page);
  }


}
