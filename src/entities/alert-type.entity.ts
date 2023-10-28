import { AlertType as AlertTypeModel } from "@prisma/client";
import { ProductEntity } from "./product.entity";
import { IsNotEmpty, Length } from 'class-validator';


export class AlertTypeEntity implements AlertTypeModel {
    id: string;

    @IsNotEmpty()
    @Length(5, 100)
    type: string;

    @IsNotEmpty()
    @Length(5, 100)
    color: string;
    
}
