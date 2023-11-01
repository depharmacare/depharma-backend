import { HttpException, Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateAlertTypeDto } from '../dto/alert-type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertTypeService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createAlertTypeDto: CreateAlertTypeDto) {
        try {
            const { type } = createAlertTypeDto
            // Before create check it the alert type is created with same name and color
            const existingAlertType = await this.prismaService.alertType.findFirst({
                where: {
                    type: {
                        equals: type,
                        mode: 'insensitive'
                    }
                }
            })

            if (existingAlertType) {
                throw new HttpException('Alert Type already exists', HttpStatus.BAD_REQUEST)
            }

            const alertType = await this.prismaService.alertType.create({
                data: createAlertTypeDto
            })

            return alertType
        } catch (error) {
            
            throw new HttpException(
                error.response ? error.response : 'Something went wrong',
                error.status ? error.status : HttpStatus.BAD_REQUEST
            )
        }
    }

    async findAll() {
        try {
            const alertTypes = await this.prismaService.alertType.findMany()
            return alertTypes
        } catch (error) {
            throw new HttpException('Something went wrong', 400)
        }
    }
    async findOne(id: string) {
        try {
            const alertType = await this.prismaService.alertType.findUnique({
                where: { id }
            })

            if (!alertType) {
                throw new NotFoundException(`Alert type with id ${id} not found`)
            }

            return alertType
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Re-throw the NotFoundException
            } else {
                throw new HttpException('Something went wrong', 400)
            }
        }
    }
    async remove(id: string) {
        try {
            const existingAlertType = await this.prismaService.alertType.findUnique({
                where: { id }
            })
            console.log("DD", existingAlertType)
            if (!existingAlertType) {
                console.log("DD BABUU", existingAlertType)
                throw new NotFoundException(`Alert Type with ID ${id} not found`);
            }

            // If the category exists, delete it
            const deletedAlertType = await this.prismaService.alertType.delete({
                where: { id }
            })

            return deletedAlertType;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Re-throw the NotFoundException
            } else {
                throw new HttpException('Something went wrong', 400)
            }
        }
    }
}
