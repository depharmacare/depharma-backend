import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryByCategoryService {
  constructor(private readonly prismaService: PrismaService) { }
  async getInventoryByCategoryId(id: string, page: number) {
    try {
      const itemsPerPage = 10
      // Check if the category exists
      const category = await this.prismaService.category.findUnique({
        where: { id }
      })

      if (!category) {
        throw new NotFoundException(`Category with id ${id} doesnot exists`)
      }

      // If category is present the give
      // Products on basis of pagination
      const products = await this.prismaService.product.findMany({
        where: {
          categoryId: category.id,
        },
        skip: (page - 1) * itemsPerPage, // Calculate the number of items to skip
        take: itemsPerPage, // Number of items to retrieve per page
        include: {
          category: true,
          Alert: {
            select: {
              alertType: true,
            },
          },
          ProductStock: {
            select: {
              id: true,
              quantity: true,
              pricePerQty : true,
              stockRepresentation: {
                select: {
                  name: true
                }
              }
            }
          },
        },
      });

      return products
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      } else {
        throw new HttpException('Something went wrong', 400)
      }
    }
  }


}
