import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from 'src/dto/payment-method.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly prismaService: PrismaService) { }


  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    try {
      const { methodName } = createPaymentMethodDto
      const existingPaymentMethod = await this.prismaService.paymentMethods.findFirst({
        where: {
          methodName: {
            equals: methodName,
            mode: 'insensitive'
          }
        }
      })

      if (existingPaymentMethod) {
        throw new HttpException(`Alert Type with name ${methodName} already exists`, HttpStatus.BAD_REQUEST)
      }

      const paymentMethod = await this.prismaService.paymentMethods.create({
        data: createPaymentMethodDto
      })


      return paymentMethod
    } catch (error) {
      throw new HttpException(
        error.response ? error.response : 'Something went wrong',
        error.status ? error.status : HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try {
      const paymentMethods = await this.prismaService.paymentMethods.findMany()

      return paymentMethods
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string) {
    try {
      const paymentMethod = await this.prismaService.paymentMethods.findUnique({
        where: { id }
      })

      if (!paymentMethod) {
        throw new NotFoundException(`Payment method with ID ${id} not found`)
      }

      return paymentMethod

    } catch (error) {
      throw new HttpException(
        error.response ? error.response : 'Something went wrong',
        error.status ? error.status : HttpStatus.BAD_REQUEST
      )
    }
  }


  async remove(id: string) {
    try {
      const existingPaymentMethod = await this.prismaService.paymentMethods.findUnique({
        where: { id }
      })


      if (!existingPaymentMethod) {
        throw new NotFoundException(`Payment method with ID ${id} not found`);
      }

      // If the category exists, delete it
      const deletedPaymentethod = await this.prismaService.paymentMethods.delete({
        where: { id }
      })

      return deletedPaymentethod;
    } catch (error) {
      throw new HttpException(
        error.response ? error.response : 'Something went wrong',
        error.status ? error.status : HttpStatus.BAD_REQUEST
      )
    }
  }
}
