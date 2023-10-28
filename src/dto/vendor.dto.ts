import { OmitType } from "@nestjs/mapped-types";
import { VendorEntity } from "src/entities/vendor.entity";

export class CreateVendorDto extends OmitType(VendorEntity, ['id']) {
    
}