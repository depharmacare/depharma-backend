import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { error } from 'console';
import { CreateVendorDto } from 'src/dto/vendor.dto';
import { VendorClearenceDto } from 'src/dto/vendorClearence.dto'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private readonly prismaService: PrismaService) { }


  async create(createVendorDto: CreateVendorDto) {
    const { distributers, products, ...vendorData } = createVendorDto
    const vendor = await this.prismaService.vendor.create({
      data: vendorData
    })

    return vendor
  }

  async findAll() {
    try {
      const vendors = await this.prismaService.vendor.findMany({
        include: {
          distributers: { select: { name: true, contact: true } },
          products: {
            select: {
              purchasePrice: true,
            }
          },
          cendorClearences: {
            select: {
              clearenceAmount: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      })

      const vendorsWithSum = vendors.map((vendor) => {
        const totalBill = vendor.products.reduce(
          (sum, product) => sum + product.purchasePrice,
          0
        );
        const totalClearence = vendor.cendorClearences.reduce(
          (sum, clearence) => sum + clearence.clearenceAmount,
          0
        )

        return {
          ...vendor,
          totalBill,
          totalClearence,
          balance: totalBill - totalClearence
        };
      });



      return vendorsWithSum
    } catch (error) {
      throw new HttpException('Something went wrong', 400)
    }
  }

  async findOne(id: string) {
    try {
      const vendor = await this.prismaService.vendor.findUnique({
        where: { id },
        include: {
          distributers: true,
          products: {
            select: {
              purchasePrice: true,
            }
          },
          cendorClearences: {
            select: {
              clearenceAmount: true
            }
          }
        }
      })

      const totalBill = vendor.products.reduce(
        (sum, product) => sum + product.purchasePrice,
        0
      )


      return { ...vendor, totalBill }
    } catch (error) {
      throw new HttpException('Something went wrong', 400)
    }
  }

  async remove(id: string) {
    const existingVendor = await this.prismaService.vendor.findUnique({
      where: { id }
    })

    if (!existingVendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }

    // If the category exists, delete it
    const deletedVendor = await this.prismaService.vendor.delete({
      where: { id }
    })

    return deletedVendor;
  }

  async createAVendor(createVendorDto: CreateVendorDto) {
    try {
      const { products, distributers, ...vendorData } = createVendorDto

      const vendor = this.prismaService.vendor.create({
        data: {
          name: vendorData.name,
          distributers: {
            create: distributers
          }
        }
      })

      return vendor
    } catch (error) {
      return error
    }
  }

  async vendorClearence(vendorClearenceDto: VendorClearenceDto) {
    try {
      const vendorClearence = await this.prismaService.vendorClearence.create({
        data: vendorClearenceDto
      })

      return vendorClearence
    } catch (error) {
      throw new HttpException('Something went wrong', 400)
    }
  }

}
