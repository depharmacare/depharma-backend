import { Controller, Get, Put, Post, Delete, Body, Param, HttpException } from '@nestjs/common';
import { AlertTypeService } from './alert-type.service';
import { CreateAlertTypeDto } from '../dto/alert-type.dto';

@Controller('alert-type')
export class AlertTypeController {
    constructor(private readonly alertTypeService: AlertTypeService) { }

    @Post()
    async create(@Body() createAlertTypeDto: CreateAlertTypeDto) {
        return await this.alertTypeService.create(createAlertTypeDto);
    }

    @Get()
    findAll() {
        return this.alertTypeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.alertTypeService.findOne(id);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.alertTypeService.remove(id);
    }
}
