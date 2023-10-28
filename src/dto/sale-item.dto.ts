import { OmitType } from "@nestjs/mapped-types";
import { SaleItemEntity } from "src/entities/sale-item.entity";
export class CreateSaleItemDto extends OmitType(SaleItemEntity, ['id']) {
    
}