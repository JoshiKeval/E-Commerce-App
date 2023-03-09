import { IsString, MaxLength, Matches, IsOptional } from "class-validator";

export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  update_contact_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  update_password: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_brand_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_brand_type: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  update_address: string;

  @IsOptional()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  update_gst_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_pan_no: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_bank_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_brand_account_no: string;
}
