import { OmitType } from "@nestjs/mapped-types";
import { PaymentMethodsEntity } from "src/entities/payment-method.entity";

export class CreatePaymentMethodDto extends OmitType(PaymentMethodsEntity, ['id']) {

}