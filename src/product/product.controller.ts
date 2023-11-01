import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { JwtAuthGaurd } from '../auth/jwt-auth.gaurd';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @UseGuards(JwtAuthGaurd)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGaurd)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }


}
