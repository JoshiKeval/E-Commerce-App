import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Admin } from "src/db/entities/admin_register.entity";
import { Buyer } from "src/db/entities/buyer_register.entity";
import { Seller } from "src/db/entities/seller_info.entity";
import { BuyerSignUpDto } from "src/dto/request/buyerSignUp.dto";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.dto";
import { SignInDto } from "src/dto/request/signIn.dto";
import { UpdateBuyerDto } from "src/dto/request/updateBuyer.dto";
import { UpdateSellerDto } from "src/dto/request/updateSeller.dto";
import { RoleGuard } from "src/role.guard";
import { ROLE_CONSTANT } from "src/roleConstant";
import { DataSource, Repository } from "typeorm";
import { AuthService } from "./auth.service";

// @ApiTags("Auth-Admin-Buyer-Seller")
@Controller("auth")
export class AuthController {
  private sellerRepo: Repository<Seller>;
  private buyerRepo: Repository<Buyer>;
  private adminRepo: Repository<Admin>;
  constructor(
    private authService: AuthService,
    @Inject("DataSource")
    private dataSource: DataSource
  ) {
    this.sellerRepo = this.dataSource.getRepository(Seller);
    this.buyerRepo = this.dataSource.getRepository(Buyer);
    this.adminRepo = this.dataSource.getRepository(Admin);
  }

  @Post("/seller/signUp")
  sellerSignUp(
    @Body()
    sellerSignUpDto: SellerSignUpDto
  ) {
    return this.authService.sellerSignUp(sellerSignUpDto);
  }

  @Post("/buyer/signUp")
  buyerSignUp(
    @Body()
    buyerSignUpDto: BuyerSignUpDto
  ) {
    return this.authService.buyerSignUp(buyerSignUpDto);
  }

  @Post("/seller/signIn")
  sellerSignIn(@Body() signInDto: SignInDto) {
    const role = ROLE_CONSTANT.ROLES.SELLER;
    return this.authService.signIn(signInDto, role, this.sellerRepo);
  }

  @Post("/buyer/signIn")
  buyerSignIn(@Body() signInDto: SignInDto) {
    const role = ROLE_CONSTANT.ROLES.BUYER;
    return this.authService.signIn(signInDto, role, this.buyerRepo);
  }

  @Post("/admin/signIn")
  adminSignIn(@Body() signInDto: SignInDto) {
    const role = ROLE_CONSTANT.ROLES.ADMIN;
    return this.authService.signIn(signInDto, role, this.adminRepo);
  }

  @Patch("/update/buyer")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.BUYER))
  updateBuyer(@Req() req, @Body() updateBuyerDto: UpdateBuyerDto) {
    const email = req.user.email;
    return this.authService.updateBuyer(email, updateBuyerDto);
  }

  @Patch("/update/seller")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  updateSeller(@Req() req, @Body() updateSellerDto: UpdateSellerDto) {
    const email = req.user.email;
    return this.authService.updateSeller(email, updateSellerDto);
  }
}
function ApiTags(arg0: string) {
  throw new Error("Function not implemented.");
}
