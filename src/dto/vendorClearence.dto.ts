import { OmitType } from "@nestjs/mapped-types"
import { VendorClearenceEntity } from "../entities/vendorClearence.entity"


export class VendorClearenceDto extends OmitType(VendorClearenceEntity, ["id"]) {

}