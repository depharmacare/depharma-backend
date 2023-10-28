import { Alert as AlertModel } from "@prisma/client";
import { ProductEntity } from "./product.entity";
import { IsNotEmpty, Length } from 'class-validator';


export class AlertEntity implements AlertModel {
    id: string;
    @IsNotEmpty()
    alertTypeId: string;
    
    productId: string;
}
