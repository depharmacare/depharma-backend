import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const { products, StoctRepresentations, ...categoryData } = createCategoryDto
    const category = await this.prismaService.category.create({
      data: {
        ...categoryData,
        StoctRepresentations: {
          create: StoctRepresentations
        }
      }
    })

    return category;
  }

  async findAll() {
    const categories = await this.prismaService.category.findMany({
      include: {
        StoctRepresentations : true
      },
    });
    return categories
  }

  async findOne(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      include: {
        products: true
      }
    })

    if (!category) throw new NotFoundException(`Category with id ${id} not found`)

    return category
  }

  async remove(id: string) {
    const existingCategory = await this.prismaService.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }


    // If the category exists, delete it
    const deletedCategory = await this.prismaService.category.delete({
      where: { id }
    })

    return deletedCategory
  }
}
