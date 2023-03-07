import { Body, Controller, Get, Post } from "@nestjs/common";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.Dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/seller/signUp")
  sellerSignUp(@Body() sellerSignUpDto: SellerSignUpDto) {
    return this.authService.sellerSignUp(sellerSignUpDto);
  }
}
