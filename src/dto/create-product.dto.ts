import { OmitType } from "@nestjs/mapped-types";
import { ProductEntity } from "src/entities/product.entity";

export class CreateProductDto extends OmitType(ProductEntity , ['id']) {}
