import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { SellerSignUpDto } from "src/dto/request/sellerSignUp.Dto";
import * as bcrypt from "bcrypt";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { SellerInfo } from "src/db/entities/seller_info.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private authRepo: Repository<SellerInfo>;
  constructor(
    @Inject("DataSource")
    private dataSource: DataSource, // private readonly jwtService: JwtService
    private readonly jwtService: JwtService
  ) {
    this.authRepo = this.dataSource.getRepository(SellerInfo);
  }

  async sellerSignUp(sellerSignUpDto: SellerSignUpDto) {
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

    // console.log("seller name", seller_name);
    // console.log("seller_email", seller_email);
    // console.log("contact_no", contact_no);
    // console.log("seller_password", seller_password);
    // console.log("brand_name", brand_name);
    // console.log("address", address);
    // console.log("gst_no", gst_no);
    // console.log("pan_no", pan_no);
    // console.log("bank_name", bank_name);
    // console.log("brand_account_no", brand_account_no);
    // console.log("status", status);

    //hash
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(seller_password, salt);

    const sellerInfo = this.authRepo.create({
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
      await this.authRepo.save(sellerInfo);
      return "Data Insert Successfully";
    } catch (error) {
      if ((error.code = "23505")) {
        throw new ConflictException("user name already exists");
      } else {
        throw new InternalServerErrorException("something went wrong");
      }
    }
  }
}
