import { Category as CategoryModel , Product as ProductModel } from "@prisma/client";
import { ProductEntity } from "./product.entity";
import {IsNotEmpty, Length, IsArray, ArrayNotEmpty, ValidateNested} from 'class-validator';
import { StockRepresentationEntity } from "./stock-representations.entity";
import { Type } from "class-transformer";


export class CategoryEntity implements CategoryModel {
    id: string;
    @IsNotEmpty()
    @Length(5 , 225)
    name: string;
    products: ProductEntity[]

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each : true})
    @Type(() => StockRepresentationEntity)
    StoctRepresentations: StockRepresentationEntity[]
}
