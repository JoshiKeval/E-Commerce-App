import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class AdminSignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({name:"admin_email",description:"admin_email",type:"email",required:true})
  admin_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({name:"admin_password",description:"addpass",type:"string",required:true})
  admin_password: string;
}
