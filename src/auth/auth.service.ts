import { Injectable } from "@nestjs/common";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.dto";
import * as bcrypt from "bcryptjs";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { SellerInfo } from "src/db/entities/seller_info.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { BuyerSignUpDto } from "src/dto/request/buyerSignUp.dto";
import { BuyerRegister } from "src/db/entities/buyer_register.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { AdminRegister } from "src/db/entities/admin_register.entity";
import { UpdateBuyerDto } from "src/dto/request/updateBuyer.dto";
import { UpdateSellerDto } from "src/dto/request/updateSeller.dto";
import { SignUpResDto } from "src/dto/response/signUpRes.dto";
import { SignInResDto } from "src/dto/response/signInRes.dto";
import { UpdateResDto } from "src/dto/response/updateRes.dto";
import { SignInDto } from "src/dto/request/signIn.dto";

@Injectable()
export class AuthService {
  public sellerRepo: Repository<SellerInfo>;
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
      name,
      email,
      contact_no,
      password,
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

    const hashPassword = await bcrypt.hash(password, salt);

    const sellerInfo = this.sellerRepo.create({
      name,
      email,
      contact_no,
      password: hashPassword,
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
    let { name, email, password } = buyerSignUpDto;

    //hash
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const buyerInfo = this.buyerRepo.create({
      name,
      email,
      password: hashPassword,
    });

    try {
      await this.buyerRepo.save(buyerInfo);
      return new SignUpResDto(201, "SignUp Successfully");
    } catch (error) {
      if ((error.code = "23505")) {
        return new SignUpResDto(409, "Buyer is already exists");
      } else {
        return new SignUpResDto(500, "Something Went Wrong!!");
      }
    }
  }

  async signIn(signInDto: SignInDto, role, dbRepo): Promise<SignInResDto> {
    const { email, password } = signInDto;

    const user = await dbRepo.findOneBy({ email });

    let flag;

    try {
      if (user.status == false) {
        flag = false;
      }
    } catch (e) {
      flag = true;
    }

    if (flag == false) {
      return new SignInResDto(401, "Mail Verification Pending");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email, role };
      const accessToken: string = await this.jwtService.sign(payload);
      return new SignInResDto(201, "Login Successfully", accessToken);
    } else {
      return new SignInResDto(401, "Pleace Check your login credentials");
    }
  }

  // // update buyerDetails -----------------------------------------------------
  async updateBuyer(
    email,
    updateBuyerDto: UpdateBuyerDto
  ): Promise<UpdateResDto> {
    const user = await this.buyerRepo.findOneBy({ email });

    if (!user) {
      return new UpdateResDto(404, "Buyer is not found");
    }
    let hashPassword;

    if (updateBuyerDto.update_password != undefined) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(updateBuyerDto.update_password, salt);
    }
    user.name = updateBuyerDto.update_name;
    user.password = hashPassword;

    try {
      this.buyerRepo.update({ email: email }, user);
      return new UpdateResDto(200, "Buyer Update Successfully");
    } catch {
      return new UpdateResDto(500, "Something Went Wrong!!");
    }
  }

  // update sellerDetails -----------------------------------------------------
  async updateSeller(
    email,
    updateSellerDto: UpdateSellerDto
  ): Promise<UpdateResDto> {
    const user = await this.sellerRepo.findOneBy({ email });

    if (!user) {
      return new UpdateResDto(404, "Buyer is not found");
    } else if (user.status == false) {
      return new UpdateResDto(404, "Mail Verification Pending");
    }

    let hashPassword;

    if (updateSellerDto.update_password != undefined) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(updateSellerDto.update_password, salt);
    }
    user.name = updateSellerDto.update_name;
    user.contact_no = updateSellerDto.update_contact_no;
    user.password = hashPassword;
    user.brand_name = updateSellerDto.update_brand_name;
    user.brand_type = updateSellerDto.update_brand_type;
    user.address = updateSellerDto.update_address;
    user.gst_no = updateSellerDto.update_gst_no;
    user.pan_no = updateSellerDto.update_pan_no;
    user.bank_name = updateSellerDto.update_bank_name;
    user.brand_account_no = updateSellerDto.update_brand_account_no;

    try {
      this.sellerRepo.update({ email: email }, user);
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
