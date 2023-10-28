import { StoctRepresentations as StockRepresentationsModel } from '@prisma/client'
import { IsNotEmpty, Length, IsNumber } from 'class-validator'


export class StockRepresentationEntity implements StockRepresentationsModel {
    id: string;
    @IsNotEmpty()
    @Length(3, 20)
    name: string;

    categoryId: string;
}