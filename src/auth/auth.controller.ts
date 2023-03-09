import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminSignInDto } from "src/dto/request/adminSignIn.dto";
import { BuyerSignInDto } from "src/dto/request/buyerSignIn.dto";
import { BuyerSignUpDto } from "src/dto/request/buyerSignUp.dto";
import { SellerSignInDto } from "src/dto/request/sellerSignIn.dto";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.dto";
import { UpdateBuyerDto } from "src/dto/request/updateBuyer.dto";
import { UpdateSellerDto } from "src/dto/request/updateSeller.dto";
import { SignInResDto } from "src/dto/response/signInRes.dto";
import { SignUpResDto } from "src/dto/response/signUpRes.dto";
import { UpdateResDto } from "src/dto/response/updateRes.dto";
import { RoleGuard } from "src/role.guard";
import { ROLE_CONSTANT } from "src/roleConstant";
import { DataSource, Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/seller/signUp")
  sellerSignUp(
    @Body()
    sellerSignUpDto: SellerSignUpDto
  ): Promise<SignUpResDto> {
    return this.authService.sellerSignUp(sellerSignUpDto);
  }

  @Post("/buyer/signUp")
  buyerSignUp(
    @Body()
    buyerSignUpDto: BuyerSignUpDto
  ): Promise<SignUpResDto> {
    return this.authService.buyerSignUp(buyerSignUpDto);
  }

  @Post("/seller/signIn")
  sellerSignIn(
    @Body() sellerSignInDto: SellerSignInDto
  ): Promise<SignInResDto> {
    return this.authService.sellerSignIn(sellerSignInDto);
  }

  @Post("/buyer/signIn")
  buyerSignIn(@Body() buyerSignInDto: BuyerSignInDto): Promise<SignInResDto> {
    return this.authService.buyerSignIn(buyerSignInDto);
  }

  @Post("/admin/signIn")
  adminSignIn(@Body() adminSignInDto: AdminSignInDto): Promise<SignInResDto> {
    return this.authService.adminSignIn(adminSignInDto);
  }

  @Get("/seller")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  seller(): string {
    return "THis is seller";
  }

  @Patch("/update/buyer")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.BUYER))
  updateBuyer(
    @Req() req,
    @Body() updateBuyerDto: UpdateBuyerDto
  ): Promise<UpdateResDto> {
    const email = req.user.buyer_email;
    return this.authService.updateBuyer(email, updateBuyerDto);
  }

  @Patch("/update/seller")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  updateSeller(
    @Req() req,
    @Body() updateSellerDto: UpdateSellerDto
  ): Promise<UpdateResDto> {
    const email = req.user.seller_email;
    return this.authService.updateSeller(email, updateSellerDto);
  }
}
