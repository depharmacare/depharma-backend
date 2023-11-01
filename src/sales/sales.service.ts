import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSaleDto } from '../dto/sale.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createSaleDto: CreateSaleDto) {


    try {
      const { SaleItem, ...saleData } = createSaleDto
      const sale = await this.prismaService.sales.create({
        data: {
          ...saleData,
          SaleItem: {
            createMany: {
              data: SaleItem
            }
          }
        }
      })

      return { message: 'sale created successfully', sale }
    } catch (error) {
      throw new HttpException(
        error.response ? error.response : 'Something went wrong',
        error.status ? error.status : HttpStatus.BAD_REQUEST
      )
    }
  }


  async getAllSales() {
    try {
      const sales = await this.prismaService.sales.findMany({
        include: {
          paymentMethod: true,
          SaleItem : true
        }
      })

      if (!sales) {
        throw new HttpException('No sales found', HttpStatus.NO_CONTENT)
      }

      return sales
    } catch (error) {
      throw new HttpException(
        error.response ? error.response : 'Something went wrong',
        error.status ? error.status : HttpStatus.BAD_REQUEST
      )
    }
  }


}
