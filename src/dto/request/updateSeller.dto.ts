import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, Matches, IsOptional } from "class-validator";

export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"update_name",description:"update_name",type:"string",required:true})
  update_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  @ApiProperty({name:"update_contact_no",description:"update_contact_no",type:"string",required:true})
  update_contact_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({name:"update_password",description:"update_password",type:"string",required:true})
  update_password: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"update_brand_name",description:"update_brand_name",type:"string",required:true})
  update_brand_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"update_brand_type",description:"update_brand_type",type:"string",required:true})
  update_brand_type: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({name:"update_address",description:"update_address",type:"string",required:true})
  update_address: string;

  @IsOptional()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  @ApiProperty({name:"update_gst_no",description:"update_gst_no",type:"string",required:true})
  update_gst_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"update_pan_no",description:"update_pan_no",type:"string",required:true})
  update_pan_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"update_bank_name",description:"update_bank_name",type:"string",required:true})
  update_bank_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"update_brand_account_no",description:"update_brand_account_no",type:"string",required:true})
  update_brand_account_no: string;
}
