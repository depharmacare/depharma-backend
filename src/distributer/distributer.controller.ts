import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { DistributerService } from './distributer.service';
import { CreateDistributerDto } from 'src/dto/distributer.dto';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';

@Controller('distributer')
export class DistributerController {
  constructor(private readonly distributerService: DistributerService) {}


  @UseGuards(JwtAuthGaurd)
  @Post()
  create(@Body() createDistributerDto: CreateDistributerDto) {
    return this.distributerService.create(createDistributerDto);
  }
  
  @UseGuards(JwtAuthGaurd)
  @Get()
  findAll() {
    return this.distributerService.findAll();
  }
  
  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distributerService.findOne(id);
  }
  
  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distributerService.remove(id);
  }
}
