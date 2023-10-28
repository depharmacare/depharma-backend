import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from 'src/dto/payment-method.dto';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) { }


  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @UseGuards(JwtAuthGaurd)
  @Get()
  async findAll() {
    return await this.paymentMethodsService.findAll();
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentMethodsService.findOne(id);
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paymentMethodsService.remove(id);
  }
}
