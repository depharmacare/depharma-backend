
import { Product as ProductModel, Category as CategoryModel } from '@prisma/client'
import { CategoryEntity } from './category.entity';
import { VendorEntity } from './vendor.entity';
import { IsNotEmpty, Length, IsISO8601, IsNumber, IsInt, min, Min, Max, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator'
import { AlertEntity } from './alert.entity';
import { Type } from 'class-transformer';
import { ProductStockEntity } from './product-stock.entity';


export class ProductEntity implements ProductModel {
    id: string;

    @IsNotEmpty()
    @Length(5, 100)
    name: string;

    @IsNotEmpty()
    @Length(5, 100)
    saltName: string;

    description: string;

    @IsNotEmpty()
    @IsISO8601({ strict: true })
    manufactureDate: Date;

    @IsNotEmpty()
    @IsISO8601({ strict: true })
    ExpiryDate: Date;

    @IsNumber()
    @IsNotEmpty()
    purchasePrice: number;

    @IsNumber()
    @IsNotEmpty()
    sellingPrice: number;

    // @IsNumber()
    // @IsNotEmpty()
    // packets: number;

    // @IsNumber()
    // @IsNotEmpty()
    // strips: number;

    // @IsNumber()
    // @IsNotEmpty()
    // tablets: number;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(50)
    discount: number;

    @IsNotEmpty()
    categoryId: string;
    category: CategoryEntity;

    @IsNotEmpty()
    vendorId: string;
    vendor: VendorEntity


    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => AlertEntity)
    Alert: AlertEntity[]
    
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each : true})
    @Type(() => ProductStockEntity)
    ProductStock: ProductStockEntity[]
}
