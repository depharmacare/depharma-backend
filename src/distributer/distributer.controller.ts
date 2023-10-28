import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { DistributerService } from './distributer.service';
import { CreateDistributerDto } from 'src/dto/distributer.dto';

@Controller('distributer')
export class DistributerController {
  constructor(private readonly distributerService: DistributerService) {}

  @Post()

  create(@Body() createDistributerDto: CreateDistributerDto) {
    return this.distributerService.create(createDistributerDto);
  }

  @Get()
  findAll() {
    return this.distributerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distributerService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distributerService.remove(id);
  }
}
