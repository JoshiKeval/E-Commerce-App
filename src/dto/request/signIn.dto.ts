import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class SignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({name:"email",description:"email",type:"email",required:true})
  email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({name:"password",description:"password",type:"string",required:true})
  password: string;
}
