import { IsNumber, IsString } from "class-validator";

export class SellerSignUpResDto {
  @IsNumber()
  status: number;

  @IsString()
  msg: string;

  constructor(status, msg) {
    this.status = status;
    this.msg = msg;
  }
}
