import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { JwtAuthGaurd } from '../auth/jwt-auth.gaurd';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @UseGuards(JwtAuthGaurd)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
  
  @UseGuards(JwtAuthGaurd)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  
  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }
  
  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
