import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class BuyerSignUpDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({name:"buyer_name",description:"buyername",type:"string",required:true})
  buyer_name: string;

  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({name:"buyer_email",description:"buyer_email",type:"string",required:true})
  buyer_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({name:"buyer_password",description:"buyer_password",type:"string",required:true})
  buyer_password: string;
}
