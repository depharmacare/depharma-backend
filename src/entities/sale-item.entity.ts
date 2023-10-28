import { SaleItem as SaleItemModel } from "@prisma/client";

import { Length, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested, IsOptional, IsNumber } from 'class-validator'
import { Type } from "class-transformer";


export class SaleItemEntity implements SaleItemModel {
    id: string;
    @IsNotEmpty()
    productId: string;
    saleId: string;

    @IsNotEmpty()
    productStockId: string;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    createdAt: Date;
    updatedAt: Date;

}