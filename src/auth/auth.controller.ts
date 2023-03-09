import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminSignInDto } from "src/dto/request/adminSignIn.dto";
import { BuyerSignInDto } from "src/dto/request/buyerSignIn.dto";
import { BuyerSignUpDto } from "src/dto/request/buyerSignUp.dto";
import { SellerSignInDto } from "src/dto/request/sellerSignIn.dto";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.dto";
import { AdminSignInResDto } from "src/dto/response/adminSignInRes.dto";
import { BuyerSignInResDto } from "src/dto/response/buyerSignInRes.dto";
import { BuyerSignUpResDto } from "src/dto/response/buyerSignUpRes.dto";
import { SellerSignInResDto } from "src/dto/response/sellerSignInRes.dto";
import { SellerSignUpResDto } from "src/dto/response/sellerSignUpRes.dto";
import { RoleGuard } from "src/role.guard";
import { ROLE_CONSTANT } from "src/roleConstant";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/seller/signUp")
  sellerSignUp(
    @Body()
    sellerSignUpDto: SellerSignUpDto
  ): Promise<SellerSignUpResDto> {
    return this.authService.sellerSignUp(sellerSignUpDto);
  }

  @Post("/buyer/signUp")
  buyerSignUp(
    @Body()
    buyerSignUpDto: BuyerSignUpDto
  ): Promise<BuyerSignUpResDto> {
    return this.authService.buyerSignUp(buyerSignUpDto);
  }

  @Post("/seller/signIn")
  sellerSignIn(
    @Body() sellerSignInDto: SellerSignInDto
  ): Promise<SellerSignInResDto> {
    return this.authService.sellerSignIn(sellerSignInDto);
  }

  @Post("/buyer/signIn")
  buyerSignIn(
    @Body() buyerSignInDto: BuyerSignInDto
  ): Promise<BuyerSignInResDto> {
    return this.authService.buyerSignIn(buyerSignInDto);
  }

  @Post("/admin/signIn")
  adminSignIn(
    @Body() adminSignInDto: AdminSignInDto
  ): Promise<AdminSignInResDto> {
    return this.authService.adminSignIn(adminSignInDto);
  }

  @Get("/seller")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  seller(): string {
    return "THis is seller";
  }
}
