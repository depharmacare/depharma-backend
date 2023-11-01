import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistributerDto } from '../dto/distributer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistributerService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createDistributerDto: CreateDistributerDto) {

    const { vendor, ...distributerData } = createDistributerDto;

    const distributer = await this.prismaService.distributer.create({
      data: distributerData
    })


    return distributer
  }

  async findAll() {
    const distributers = await this.prismaService.distributer.findMany({
      include: {
        vendor: true,
      }
    })


    return distributers
  }

  async findOne(id: string) {
    const distributer = await this.prismaService.distributer.findUnique({
      where: { id },
      include: {
        vendor: true
      }
    })

    return distributer
  }

  async remove(id: string) {
    const existingDistributer = await this.prismaService.distributer.findUnique({
      where: { id }
    })

    if (!existingDistributer) {
      throw new NotFoundException(`Distributer with ID ${id} not found`)
    }

    const deletedDistributer = await this.prismaService.distributer.delete({
      where: { id }
    })

    return deletedDistributer
  }
}
