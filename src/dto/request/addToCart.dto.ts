import { IsNumber, IsNumberString } from "class-validator";

export class AddToCartDto {
  @IsNumber()
  quantity: number;
}
