import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from 'src/dto/vendor.dto';
import { VendorClearenceDto } from 'src/dto/vendorClearence.dto';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }


  @UseGuards(JwtAuthGaurd)
  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }
  
  @UseGuards(JwtAuthGaurd)
  @Get()
  findAll() {
    return this.vendorService.findAll();
  }
  
  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }
  
  
  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(id);
  }
  
  @UseGuards(JwtAuthGaurd)
  @Post('create-vendor')
  async createAVendor(@Body() createVendorDto: CreateVendorDto) {
    return await this.vendorService.createAVendor(createVendorDto)
  }
  
  @UseGuards(JwtAuthGaurd)
  @Post('vendor-clearence')
  async vendorClearence(@Body() vendorClearenceDto: VendorClearenceDto) {
    
    const { vendorId, clearenceAmount } = vendorClearenceDto
    const vendor = await this.vendorService.findOne(vendorId)
    
    // TO check if the vendor with the id exists
    if (!vendor) {
      throw new NotFoundException(`Vendor with id ${vendorId} not found`)
    }
    
    // Not check if the clearence amount is coming
    // high then the total bill
    if (clearenceAmount > vendor.totalBill) {
      throw new BadRequestException('Invalid Clearence Amount',
      {
        cause: new Error(),
        description: 'Cleaence amoutn should be less that total bill'
      }
      )
    }
    
    
    return await this.vendorService.vendorClearence(vendorClearenceDto)
  }
  
}
