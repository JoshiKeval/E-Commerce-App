import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class BuyerSignUpDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
