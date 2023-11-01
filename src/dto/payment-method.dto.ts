import { OmitType } from "@nestjs/mapped-types";
import { PaymentMethodsEntity } from "../entities/payment-method.entity";

export class CreatePaymentMethodDto extends OmitType(PaymentMethodsEntity, ['id']) {

}