import { OmitType } from "@nestjs/mapped-types";
import { SalesEntity } from "src/entities/sale.entity";

export class CreateSaleDto extends OmitType(SalesEntity, ['id']) {
    
}