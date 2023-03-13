import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({name:"update_name",description:"update_name",type:"string",required:true})
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
  c
  update_password: string;
}
