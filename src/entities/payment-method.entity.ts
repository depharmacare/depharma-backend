
import { PaymentMethods as PaymentMethodsModel } from '@prisma/client'

import { IsNotEmpty, Length, IsISO8601, IsNumber, IsInt, min, Min, Max, IsArray, ArrayNotEmpty, ValidateNested, isNotEmpty } from 'class-validator'



export class PaymentMethodsEntity implements PaymentMethodsModel {
    id: string;


    @IsNotEmpty()
    @Length(3, 30)
    methodName: string
}
