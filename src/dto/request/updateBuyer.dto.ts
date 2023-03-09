import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from "class-validator";

export class UpdateBuyerDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  update_name: string;

  // @IsOptional()
  // @IsString()
  // @MaxLength(50)
  // @IsEmail()
  // update_email: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  update_password: string;
}
