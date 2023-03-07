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
  seller_name: string;

  @IsString()
  @MaxLength(50)
  @IsEmail()
  seller_email: string;

  @IsString()
  @MaxLength(10)
  contact_no: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  seller_password: string;

  @IsString()
  @MaxLength(50)
  brand_name: string;

  @IsString()
  @MaxLength(50)
  brand_type: string;

  @IsString()
  @MaxLength(200)
  address: string;

  @IsString()
  @MaxLength(15)
  gst_no: string;

  @IsString()
  @MaxLength(50)
  pan_no: string;

  @IsString()
  @MaxLength(50)
  bank_name: string;

  @IsString()
  @MaxLength(50)
  brand_account_no: string;

  @IsBoolean()
  @IsOptional()
  status: boolean = false;
}
