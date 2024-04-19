// Define a class for handling product data
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export default class ProductDataModel {
 @IsString()
 @Type(() => String)
 @ApiProperty({
   description: 'Name of the Product',
   required: true,
   example: 'Toys Story',
   type: 'string',
 })
 name: string;

 @IsString()
 @Type(() => String)
 @ApiProperty({
   description: 'Price of the Product',
   required: true,
   example: '$57',
   type: 'string',
 })
 price: string;

 constructor(name: string, price: string) {
  this.name = name;
  this.price = price;
 }
}