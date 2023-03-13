import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  IsEmail,
  Matches,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class SellerSignUpDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(10)
  @ApiProperty({name:"contact_no",description:"contact_no",type:"string",required:true})
  contact_no: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"brand_name",description:"brand_name",type:"string",required:true})
  brand_name: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"brand_type",description:"brand_type",type:"string",required:true})
  brand_type: string;

  @IsString()
  @MaxLength(200)
  @ApiProperty({name:"address",description:"address",type:"string",required:true})
  address: string;

  @IsString()
  @MaxLength(15)
  @ApiProperty({name:"gst_no",description:"gst_no",type:"string",required:true})
  gst_no: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"pan_no",description:"pan_no",type:"string",required:true})
  pan_no: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"bank_name",description:"bank_name",type:"string",required:true})
  bank_name: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"brand_account_no",description:"brand_account_no",type:"string",required:true})
  brand_account_no: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({name:"status",description:"status",type:"boolean",required:true})
  status: boolean = false;
}
