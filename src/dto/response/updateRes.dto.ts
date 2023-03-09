import { IsNumber, IsString } from "class-validator";

export class UpdateResDto {
  @IsNumber()
  status: number;

  @IsString()
  msg: string;

  constructor(status, msg, token?) {
    this.status = status;
    this.msg = msg;
  }
}
