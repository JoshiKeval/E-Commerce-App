import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, isNotEmpty, IsNumber, IsNumberString, isNumberString } from "class-validator";

export class AddProductDto {

  @ApiProperty({name:"product_name",description:"enter product_name",type:"string",required:true})
  @IsNotEmpty()
  product_name: string;

  @ApiProperty({name:"product_description",description:"enter product_description",type:"string",required:true})
  @IsNotEmpty()
  product_description: string;

  @ApiProperty({name:"product_type",description:"enter product_type",type:"string",required:true})
  @IsNotEmpty()
  product_type: string;

  @ApiProperty({name:"product_subtype",description:"enter product_subtype",type:"string",required:true})
  @IsNotEmpty()
  product_subtype: string;

  @IsNotEmpty()
  @ApiProperty({name:"product_price",description:"enter product_price",type:"number",required:true})
  @IsNumberString()
  product_price: number;

  @ApiProperty({name:"product_img",description:"upload image here",type:"string",required:true})
  product_img: string;

  @ApiProperty({name:"product_tag",description:"enter product_tag in array",type:"string",required:true})
  @IsArray()
  product_tag: string;

  @ApiProperty({name:"product_tag",description:"seller id who add data",type:"string",required:true})
  seller_id: number;
}
