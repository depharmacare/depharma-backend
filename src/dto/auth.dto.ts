import { OmitType } from "@nestjs/mapped-types";
import { UsersEntity } from "src/entities/users.entity";

export class AuthLoginDto extends OmitType(UsersEntity, ['id', 'username']) {

}
