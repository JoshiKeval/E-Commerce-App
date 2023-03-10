import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductRes{
  @ApiProperty({name:"message",description:"message",type:"string",required:true})
  message:string

  constructor(message){

    this.message=message;
  }
}