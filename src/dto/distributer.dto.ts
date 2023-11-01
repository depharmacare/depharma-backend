import { OmitType } from "@nestjs/mapped-types";
import { DistributerEntity } from "../entities/distributer.entity";


export class CreateDistributerDto extends OmitType(DistributerEntity, ['id']) {
    
}