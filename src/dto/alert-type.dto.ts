import { OmitType } from "@nestjs/mapped-types";
import { AlertTypeEntity } from "src/entities/alert-type.entity";

export class CreateAlertTypeDto extends OmitType(AlertTypeEntity, ['id']) {

}