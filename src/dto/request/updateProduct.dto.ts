import { IsArray, IsEmpty, IsNumber, IsOptional, ValidateIf } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  product_name?: string;

  @IsOptional()
  product_description?: string;

  @IsOptional()
  product_type?: string;

  @IsOptional()
  product_subtype?: string;

  @IsNumber()
  @IsOptional()
  product_price?: number;

  @IsOptional()
  product_img?: string;

  @IsOptional()
  product_tag?: string;
}
