import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class SellerSignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  seller_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  seller_password: string;
}
