import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { InventoryByCategoryService } from './inventory-by-category.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';

@Controller('inventory-by-category')
export class InventoryByCategoryController {
  constructor(private readonly inventoryByCategoryService: InventoryByCategoryService) { }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  getInventoryByCategoryId(
    @Param('id') id: string,
    @Query('page') page: number,
  ) {
    return this.inventoryByCategoryService.getInventoryByCategoryId(id, page);
  }


}
