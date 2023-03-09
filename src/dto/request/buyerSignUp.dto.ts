import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class BuyerSignUpDto {
  @IsString()
  @MaxLength(50)
  buyer_name: string;

  @IsString()
  @MaxLength(50)
  @IsEmail()
  buyer_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  buyer_password: string;
}
