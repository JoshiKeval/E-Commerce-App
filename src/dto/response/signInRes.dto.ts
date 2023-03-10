import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SignInResDto {
  @ApiProperty({name:"status",description:"status",type:"number",required:true})
  @IsNumber()
  status: number;

  @ApiProperty({name:"message",description:"message",type:"string",required:true})
  @IsString()
  msg: string;

  @ApiProperty({name:"token",description:"token",type:"string",required:true})
  @IsString()
  token: string = null;

  constructor(status, msg, token?) {
    this.status = status;
    this.msg = msg;
    this.token = token;
  }
}
