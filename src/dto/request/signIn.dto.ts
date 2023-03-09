import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class SignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
