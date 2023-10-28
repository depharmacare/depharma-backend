import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from 'src/dto/sale.dto';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.salesService.create(createSaleDto);
  }

  @UseGuards(JwtAuthGaurd)
  @Get()
  async getAllSales() {
    return this.salesService.getAllSales()
  }

}
