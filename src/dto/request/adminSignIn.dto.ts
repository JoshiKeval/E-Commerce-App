import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class AdminSignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  admin_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  admin_password: string;
}
