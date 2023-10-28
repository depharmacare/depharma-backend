import { OmitType } from "@nestjs/mapped-types";
import { UsersEntity } from "src/entities/users.entity";

export class CreateUserDto extends OmitType(UsersEntity, ['id']) {

}
