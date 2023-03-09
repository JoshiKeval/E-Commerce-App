import { IsNumber, IsString } from "class-validator";

export class AdminSignInResDto {
  @IsNumber()
  status: number;

  @IsString()
  msg: string;

  @IsString()
  token: string = null;

  constructor(status, msg, token?) {
    this.status = status;
    this.msg = msg;
    this.token = token;
  }
}
