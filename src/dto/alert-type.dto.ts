import { OmitType } from "@nestjs/mapped-types";
import { AlertTypeEntity } from "../entities/alert-type.entity";

export class CreateAlertTypeDto extends OmitType(AlertTypeEntity, ['id']) {

}