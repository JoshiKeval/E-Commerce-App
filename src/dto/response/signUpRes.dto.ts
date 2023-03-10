import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SignUpResDto {
  @ApiProperty({name:"status",description:"status",type:"number",required:true})
  @IsNumber()
  status: number;

  @ApiProperty({name:"message",description:"message",type:"string",required:true})
  @IsString()
  msg: string;

  constructor(status, msg) {
    this.status = status;
    this.msg = msg;
  }
}
