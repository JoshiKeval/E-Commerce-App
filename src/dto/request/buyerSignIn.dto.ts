import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class BuyerSignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({name:"buyer_email",description:"buyeremail",type:"string",required:true})
  buyer_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({name:"buyer_password",description:"buyer_pass",type:"string",required:true})
  buyer_password: string;
}
