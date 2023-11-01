import { Vendor as VendorModel } from "@prisma/client";
import { ProductEntity } from "./product.entity";
import { DistributerEntity } from "./distributer.entity";
import { Length , IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested} from 'class-validator'
import { CreateDistributerDto } from "../dto/distributer.dto";
import { Type } from "class-transformer";


export class VendorEntity implements VendorModel {
    id: string;

    @IsNotEmpty()
    @Length(5, 100)
    name: string;
    
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each : true})
    @Type(() => DistributerEntity)
    distributers: DistributerEntity[];

    products: ProductEntity[];
}