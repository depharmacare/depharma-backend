import { Injectable, HttpException, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) { }


  async create(createProductDto: CreateProductDto) {
    try {
      const { category, vendor, Alert, ProductStock, ...productData } = createProductDto

      // Validate the Stock representation are valid as per category ID
      const gettedCategory = await this.prismaService.category.findUnique({
        where: {
          id: productData.categoryId
        }
      })

      // if not category found throw the exception
      if (!gettedCategory) {
        throw new NotFoundException(`Category Id ${productData.categoryId}  does not exists`)
      }


      const product = await this.prismaService.product.create({
        data: {
          ...productData,
          Alert: {
            create: Alert
          },
          ProductStock: {
            create: ProductStock
          }
        }
      })

      return product
    } catch (error) {
      console.log("ERR", error)
      throw new HttpException(
        error.response ? error.response : 'Something went wrong',
        error.status ? error.status : HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          category: true,
          Alert: {
            select: {
              alertType: true
            }
          },
          ProductStock: {
            select: {
              id: true,
              quantity: true,
              pricePerQty: true,
              stockRepresentation: true
            }
          }
        }
      })

      return products
    } catch (error) {
      throw new HttpException('Something went wrong', 400)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
