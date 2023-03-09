import { Injectable } from "@nestjs/common";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.dto";
import * as bcrypt from "bcrypt";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { SellerInfo } from "src/db/entities/seller_info.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SellerSignUpResDto } from "src/dto/response/sellerSignUpRes.dto";
import { BuyerSignUpDto } from "src/dto/request/buyerSignUp.dto";
import { BuyerRegister } from "src/db/entities/buyer_register.entity";
import { BuyerSignUpResDto } from "src/dto/response/buyerSignUpRes.dto";
import { SellerSignInDto } from "src/dto/request/sellerSignIn.dto";
import { SellerJwtPayload } from "./seller-jwt-payload.interface";
import { BuyerSignInDto } from "src/dto/request/buyerSignIn.dto";
import { BuyerJwtPayload } from "./buyer-jwt-payload.interface";
import { SellerSignInResDto } from "src/dto/response/sellerSignInRes.dto";
import { BuyerSignInResDto } from "src/dto/response/buyerSignInRes.dto";
import { ROLE_CONSTANT } from "src/roleConstant";
import { AdminSignInDto } from "src/dto/request/adminSignIn.dto";
import { AdminSignInResDto } from "src/dto/response/adminSignInRes.dto";
import { AdminRegister } from "src/db/entities/admin_register.entity";
import { AdminJwtPayload } from "./admin-jwt-payload.interface";

@Injectable()
export class AuthService {
  private sellerRepo: Repository<SellerInfo>;
  private buyerRepo: Repository<BuyerRegister>;
  private adminRepo: Repository<AdminRegister>;
  constructor(
    @Inject("DataSource")
    private dataSource: DataSource,
    private readonly jwtService: JwtService
  ) {
    this.sellerRepo = this.dataSource.getRepository(SellerInfo);
    this.buyerRepo = this.dataSource.getRepository(BuyerRegister);
    this.adminRepo = this.dataSource.getRepository(AdminRegister);
  }

  // sellerSignUp -----------------------------------------------------
  async sellerSignUp(
    sellerSignUpDto: SellerSignUpDto
  ): Promise<SellerSignUpResDto> {
    let {
      seller_name,
      seller_email,
      contact_no,
      seller_password,
      brand_name,
      brand_type,
      address,
      gst_no,
      pan_no,
      bank_name,
      brand_account_no,
      status,
    } = sellerSignUpDto;

    //hash
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(seller_password, salt);

    const sellerInfo = this.sellerRepo.create({
      seller_name,
      seller_email,
      contact_no,
      seller_password: hashPassword,
      brand_name,
      brand_type,
      address,
      gst_no,
      pan_no,
      bank_name,
      brand_account_no,
      status,
    });

    try {
      await this.sellerRepo.save(sellerInfo);
      return new SellerSignUpResDto(201, "SignUp Successfully");
    } catch (error) {
      if ((error.code = "23505")) {
        return new SellerSignUpResDto(409, "Seller is already exists");
      } else {
        return new SellerSignUpResDto(500, "Something Went Wrong!!");
      }
    }
  }

  // buyerSignUp -----------------------------------------------------
  async buyerSignUp(
    buyerSignUpDto: BuyerSignUpDto
  ): Promise<BuyerSignUpResDto> {
    let { buyer_name, buyer_email, buyer_password } = buyerSignUpDto;

    //hash
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(buyer_password, salt);

    const buyerInfo = this.buyerRepo.create({
      buyer_name,
      buyer_email,
      buyer_password: hashPassword,
    });

    try {
      await this.buyerRepo.save(buyerInfo);
      return new BuyerSignUpResDto(201, "SignUp Successfully");
    } catch (error) {
      if ((error.code = "23505")) {
        return new BuyerSignUpResDto(409, "Seller is already exists");
      } else {
        return new BuyerSignUpResDto(500, "Something Went Wrong!!");
      }
    }
  }

  // sellerSignIn -----------------------------------------------------
  async sellerSignIn(
    sellerSignInDto: SellerSignInDto
  ): Promise<SellerSignInResDto> {
    const { seller_email, seller_password } = sellerSignInDto;

    const user = await this.sellerRepo.findOneBy({ seller_email });

    if (user && (await bcrypt.compare(seller_password, user.seller_password))) {
      const role = ROLE_CONSTANT.ROLES.SELLER;
      const payload: SellerJwtPayload = { seller_email, role };

      console.log(payload);

      const accessToken: string = await this.jwtService.sign(payload);
      return new SellerSignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new SellerSignInResDto(401, "Pleace Check your login credentials");
    }
  }

  // buyerSignIn -----------------------------------------------------
  async buyerSignIn(
    buyerSignInDto: BuyerSignInDto
  ): Promise<BuyerSignInResDto> {
    const { buyer_email, buyer_password } = buyerSignInDto;

    const user = await this.buyerRepo.findOneBy({ buyer_email });

    if (user && (await bcrypt.compare(buyer_password, user.buyer_password))) {
      const role = ROLE_CONSTANT.ROLES.BUYER;
      const payload: BuyerJwtPayload = { buyer_email, role };

      const accessToken: string = await this.jwtService.sign(payload);
      return new BuyerSignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new BuyerSignInResDto(401, "Pleace Check your login credentials");
    }
  }

  // adminSignIn -----------------------------------------------------
  async adminSignIn(
    adminSignInDto: AdminSignInDto
  ): Promise<AdminSignInResDto> {
    const { admin_email, admin_password } = adminSignInDto;

    const user = await this.adminRepo.findOneBy({ admin_email });

    if (user && (await bcrypt.compare(admin_password, user.admin_password))) {
      const role = ROLE_CONSTANT.ROLES.ADMIN;
      const payload: AdminJwtPayload = { admin_email, role };

      const accessToken: string = await this.jwtService.sign(payload);
      return new AdminSignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new AdminSignInResDto(401, "Pleace Check your login credentials");
    }
  }
}
