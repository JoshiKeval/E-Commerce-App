import { IsNotEmpty, IsArray, isNotEmpty, IsNumber } from "class-validator";

export class AddProductDto {
  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  product_description: string;

  @IsNotEmpty()
  product_type: string;

  @IsNotEmpty()
  product_subtype: string;

  @IsNotEmpty()
  @IsNumber()
  product_price: number;

  product_img: string;

  @IsArray()
  product_tag: string;

  @IsNotEmpty()
  seller_id: string;
}
