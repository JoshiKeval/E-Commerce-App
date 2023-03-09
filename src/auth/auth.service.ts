import { Injectable } from "@nestjs/common";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.dto";
import * as bcrypt from "bcrypt";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { SellerInfo } from "src/db/entities/seller_info.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { BuyerSignUpDto } from "src/dto/request/buyerSignUp.dto";
import { BuyerRegister } from "src/db/entities/buyer_register.entity";
import { SellerSignInDto } from "src/dto/request/sellerSignIn.dto";
import { SellerJwtPayload } from "./seller-jwt-payload.interface";
import { BuyerSignInDto } from "src/dto/request/buyerSignIn.dto";
import { BuyerJwtPayload } from "./buyer-jwt-payload.interface";
import { ROLE_CONSTANT } from "src/roleConstant";
import { AdminSignInDto } from "src/dto/request/adminSignIn.dto";
import { AdminRegister } from "src/db/entities/admin_register.entity";
import { AdminJwtPayload } from "./admin-jwt-payload.interface";
import { UpdateBuyerDto } from "src/dto/request/updateBuyer.dto";
import { UpdateSellerDto } from "src/dto/request/updateSeller.dto";
import { SignUpResDto } from "src/dto/response/signUpRes.dto";
import { SignInResDto } from "src/dto/response/signInRes.dto";
import { UpdateResDto } from "src/dto/response/updateRes.dto";
import { SignInDto } from "src/dto/request/signIn.dto";

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
  async sellerSignUp(sellerSignUpDto: SellerSignUpDto): Promise<SignUpResDto> {
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
      return new SignUpResDto(201, "SignUp Successfully");
    } catch (error) {
      if ((error.code = "23505")) {
        return new SignUpResDto(409, "Seller is already exists");
      } else {
        return new SignUpResDto(500, "Something Went Wrong!!");
      }
    }
  }

  // buyerSignUp -----------------------------------------------------
  async buyerSignUp(buyerSignUpDto: BuyerSignUpDto): Promise<SignUpResDto> {
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
      return new SignUpResDto(201, "SignUp Successfully");
    } catch (error) {
      if ((error.code = "23505")) {
        return new SignUpResDto(409, "Seller is already exists");
      } else {
        return new SignUpResDto(500, "Something Went Wrong!!");
      }
    }
  }

  // sellerSignIn -----------------------------------------------------
  async sellerSignIn(sellerSignInDto: SellerSignInDto): Promise<SignInResDto> {
    const { seller_email, seller_password } = sellerSignInDto;

    const user = await this.sellerRepo.findOneBy({ seller_email });

    if (user && (await bcrypt.compare(seller_password, user.seller_password))) {
      const role = ROLE_CONSTANT.ROLES.SELLER;
      const payload: SellerJwtPayload = { seller_email, role };

      const accessToken: string = await this.jwtService.sign(payload);
      return new SignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new SignInResDto(401, "Pleace Check your login credentials");
    }
  }

  // buyerSignIn -----------------------------------------------------
  async buyerSignIn(buyerSignInDto: BuyerSignInDto): Promise<SignInResDto> {
    const { buyer_email, buyer_password } = buyerSignInDto;

    const user = await this.buyerRepo.findOneBy({ buyer_email });

    if (user && (await bcrypt.compare(buyer_password, user.buyer_password))) {
      const role = ROLE_CONSTANT.ROLES.BUYER;
      const payload: BuyerJwtPayload = { buyer_email, role };

      const accessToken: string = await this.jwtService.sign(payload);
      return new SignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new SignInResDto(401, "Pleace Check your login credentials");
    }
  }

  // adminSignIn -----------------------------------------------------
  async adminSignIn(adminSignInDto: AdminSignInDto): Promise<SignInResDto> {
    const { admin_email, admin_password } = adminSignInDto;

    const user = await this.adminRepo.findOneBy({ admin_email });

    if (user && (await bcrypt.compare(admin_password, user.admin_password))) {
      const role = ROLE_CONSTANT.ROLES.ADMIN;
      const payload: AdminJwtPayload = { admin_email, role };

      const accessToken: string = await this.jwtService.sign(payload);
      return new SignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new SignInResDto(401, "Pleace Check your login credentials");
    }
  }

  // update buyerDetails -----------------------------------------------------
  async updateBuyer(
    buyer_email,
    updateBuyerDto: UpdateBuyerDto
  ): Promise<UpdateResDto> {
    const user = await this.buyerRepo.findOneBy({ buyer_email });

    if (!user) {
      return new UpdateResDto(404, "Buyer is not found");
    }
    let hashPassword;

    if (updateBuyerDto.update_password != undefined) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(updateBuyerDto.update_password, salt);
    }
    user.buyer_name = updateBuyerDto.update_name;
    user.buyer_password = hashPassword;

    try {
      this.buyerRepo.update({ buyer_email: buyer_email }, user);
      return new UpdateResDto(200, "Buyer Update Successfully");
    } catch {
      return new UpdateResDto(500, "Something Went Wrong!!");
    }
  }

  // update sellerDetails -----------------------------------------------------
  async updateSeller(
    seller_email,
    updateSellerDto: UpdateSellerDto
  ): Promise<UpdateResDto> {
    const user = await this.sellerRepo.findOneBy({ seller_email });

    if (!user) {
      return new UpdateResDto(404, "Buyer is not found");
    }

    console.log("user", user);
    let hashPassword;

    if (updateSellerDto.update_password != undefined) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(updateSellerDto.update_password, salt);
    }
    user.seller_name = updateSellerDto.update_name;
    user.contact_no = updateSellerDto.update_contact_no;
    user.seller_password = hashPassword;
    user.brand_name = updateSellerDto.update_brand_name;
    user.brand_type = updateSellerDto.update_brand_type;
    user.address = updateSellerDto.update_address;
    user.gst_no = updateSellerDto.update_gst_no;
    user.pan_no = updateSellerDto.update_pan_no;
    user.bank_name = updateSellerDto.update_bank_name;
    user.brand_account_no = updateSellerDto.update_brand_account_no;

    try {
      this.sellerRepo.update({ seller_email: seller_email }, user);
      return new UpdateResDto(200, "Seller Update Successfully");
    } catch (error) {
      if ((error.code = "23505")) {
        return new UpdateResDto(409, "Seller is already exists");
      } else {
        return new UpdateResDto(500, "Something Went Wrong!!");
      }
    }
  }
}
