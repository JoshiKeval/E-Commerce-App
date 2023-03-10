import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class SellerSignInDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({name:"seller_email",description:"seller_email",type:"email",required:true})
  seller_email: string;

  @IsString()
  @MaxLength(50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({name:"seller_password",description:"seller_password",type:"password",required:true})
  seller_password: string;
}
