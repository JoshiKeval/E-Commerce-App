import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmpty, IsNumber, IsOptional, ValidateIf } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({name:"product_name",description:"product_name",type:"string",required:true})
  product_name?: string;

  @IsOptional()
  @ApiProperty({name:"product_description",description:"product_description",type:"string",required:true})
  product_description?: string;

  @IsOptional()
  @ApiProperty({name:"product_type",description:"product_type",type:"string",required:true})
  product_type?: string;

  @IsOptional()
  @ApiProperty({name:"product_subtype",description:"product_subtype",type:"string",required:true})
  product_subtype?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({name:"product_price",description:"product_price",type:"number",required:true})
  product_price?: number;

  @IsOptional()
  @ApiProperty({name:"product_img",description:"product_img",type:"string",required:true})
  product_img?: string;

  @IsOptional()
  @ApiProperty({name:"product_tag",description:"product_tag",type:"string",required:true})
  product_tag?: string;
}
