import { Distributer as DistributerModel } from "@prisma/client";
import { VendorEntity } from "./vendor.entity";
import {Length, IsNotEmpty} from 'class-validator'

export class DistributerEntity implements DistributerModel {
    id: string;

    @IsNotEmpty()
    @Length(5,100)
    name: string;
    
    @IsNotEmpty()
    contact: string;
    
    vendorId : string;
    
    vendor: VendorEntity
}