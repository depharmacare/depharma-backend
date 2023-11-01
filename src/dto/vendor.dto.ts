import { OmitType } from "@nestjs/mapped-types";
import { VendorEntity } from "../entities/vendor.entity";

export class CreateVendorDto extends OmitType(VendorEntity, ['id']) {
    
}