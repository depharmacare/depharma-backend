import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticCardsService {
    constructor(private readonly prismaService: PrismaService) { }




    async getVendorAnalyticCards() {
        try {
            const allProductsSum = await this.prismaService.product.aggregate({
                _sum: {
                    purchasePrice: true
                }
            })

            const allVendorClearenceSum = await this.prismaService.vendorClearence.aggregate({
                _sum: {
                    clearenceAmount: true
                }
            })

            const responseData = {
                totalStockAmount: {
                    title: 'Total Stocks Amount',
                    get sum() {
                        return allProductsSum._sum.purchasePrice
                    }
                },
                totalClearence: {
                    title: 'Total Clarence',
                    get sum() {
                        return allVendorClearenceSum._sum.clearenceAmount
                    }
                },
                get vendorOutstanding() {
                    return {
                        title: 'Vendors Outstanding',
                        sum: this.totalStockAmount.sum - this.totalClearence.sum,
                    };
                }
            }

            return responseData
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST)
        }
    }

    async getProductAnalyticCards() {
        try {
            const allProductsCount = await this.prismaService.product.count()
            const totalSales = await this.prismaService.sales.aggregate({
                _sum: {
                    totalBill: true
                }
            })


            return {
                allProductsCount: {
                    title: 'Total Products',
                    sum: allProductsCount
                },
                totalSales: {
                    title: 'Total Sales',
                    sum: totalSales._sum.totalBill
                },
                criticalItems: {
                    title: 'Critical Items',
                    sum: 0
                }
            }

        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST)
        }
    }


    async getInsightsAnalyticCards() {
        try {
            const result = {}
            const paymentMethods = await this.prismaService.paymentMethods.findMany()
            const totalCustomers = await this.prismaService.sales.groupBy({
                by: ['contact'],
                _count: {
                    _all: true
                }
            })

            for (const method of paymentMethods) {
                const countsPaymentsMethodsTotal = await this.prismaService.sales.groupBy({
                    by: ['paymentMethodId'],
                    _sum: {
                        totalBill: true,
                    },
                    where: {
                        paymentMethodId: method.id
                    }
                });
                
                if(countsPaymentsMethodsTotal.length !== 0){
                    result[method.methodName.replace(/ /g, '_')] = { title: method.methodName, sum: countsPaymentsMethodsTotal[0]._sum.totalBill}
                }else{
                    result[method.methodName.replace(/ /g, '_')] = { title: method.methodName, sum: 0}
                }
            }

            result['totalCustomers'] = { title: 'total customers', sum: totalCustomers.length }



            return result
        } catch (error) {
            console.log("Error", error)
            throw new HttpException({ msg: `Something went wrong`, error }, HttpStatus.BAD_REQUEST)
        }
    }
}
