import { ApiProperty } from "@nestjs/swagger";

export class AddProductRes{
  @ApiProperty({name:"status",description:"status",type:"number",required:true})
  status:number;
  @ApiProperty({name:"message",description:"message",type:"string",required:true})
  message:string

  constructor(status,message){
    this.status=status;
    this.message=message;
  }
}