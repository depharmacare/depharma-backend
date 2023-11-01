import { SaleItem, Sales as SalesModel } from "@prisma/client";

import { Length, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested, IsOptional, IsNumber } from 'class-validator'
import { Type } from "class-transformer";
import { CreateSaleItemDto } from "../dto/sale-item.dto";
import { SaleItemEntity } from "./sale-item.entity";


export class SalesEntity implements SalesModel {
    id: string;
    @IsNotEmpty()
    @Length(5, 30)
    customerName: string;
    @IsNotEmpty()
    contact: string;
    @IsNotEmpty()
    paymentMethodId: string;
    @IsNumber()
    @IsNotEmpty()
    totalBill: number;
    @IsNumber()
    @IsNotEmpty()
    collectedAmount: number;
    @IsNumber()
    @IsNotEmpty()
    returnAmount: number;
    @IsNumber()
    @IsNotEmpty()
    discount: number;
    createdAt: Date;
    updatedAt: Date;


    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SaleItemEntity)
    SaleItem: SaleItemEntity[];
}