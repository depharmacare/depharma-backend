import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from 'src/dto/vendor.dto';
import { VendorClearenceDto } from 'src/dto/vendorClearence.dto';


@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(id);
  }

  @Post('create-vendor')
  async createAVendor(@Body() createVendorDto: CreateVendorDto) {
    return await this.vendorService.createAVendor(createVendorDto)
  }

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
