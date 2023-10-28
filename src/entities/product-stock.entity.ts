import { ProductStock as ProductStockModel } from "@prisma/client";
import { ProductEntity } from "./product.entity";
import { IsNumber, IsNotEmpty } from 'class-validator';


export class ProductStockEntity implements ProductStockModel {
    id: string;


    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    pricePerQty: number;
    // @IsNumber()
    // @IsNotEmpty()
    // packets: number;

    // @IsNumber()
    // @IsNotEmpty()
    // strips: number;

    // @IsNumber()
    // @IsNotEmpty()
    // tablets: number;
    @IsNotEmpty()
    stockRepresentationId: string;
    productId: string;

}
