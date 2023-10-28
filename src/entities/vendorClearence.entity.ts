import { VendorClearence as VendorClearenceModel, } from '@prisma/client'
import { IsNotEmpty } from 'class-validator'



export class VendorClearenceEntity implements VendorClearenceModel {
    id: string;

    @IsNotEmpty()
    clearenceAmount: number;

    @IsNotEmpty()
    vendorId: string;
    createdAt: Date;
    updatedAt: Date;
}