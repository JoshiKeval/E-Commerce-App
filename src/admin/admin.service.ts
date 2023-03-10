import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UpdateSellerStatusDto } from "src/dto/request/updatesellerstatus.dto";
import { DeleteSellerResDto } from "src/dto/response/deletesellerbyadminRes.dto";
import { UpdateMessageRes } from "src/dto/response/updatestatusmsgRes.dto";
import { SellerService } from "src/seller/seller.service";
import { DataSource } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @Inject("DataSource") private datasource: DataSource,
    public authService: AuthService
  ) {}

  async GetAllSellers() {
    return this.authService.sellerRepo.find();
  }

  async UpdateStatus(id: number, update: UpdateSellerStatusDto) {
    const data = await this.authService.sellerRepo.findOneBy({ seller_id: id });
    if (data) {
      const { status } = update;
      data.status = status;
      await this.authService.sellerRepo.update({ seller_id: id }, data);
      let res=new UpdateMessageRes("Seller Status Is Updated...")
      return res;
    } else {
      throw new NotFoundException("Seller's Data Not Found...");
    }
  }

  //  ////////////////////////////////////////////////////////////////////////delete-seller
  //  async DeleteSeller(id: number) {
  //   const data = await this.authService.sellerRepo.findOneBy({ seller_id: id });
  //   if (data) {
  //     await this.authService.sellerRepo.delete(id);
  //     let res = new DeleteSellerResDto("Seller Deleted SuccessFully...");
  //     return res;
  //   } else {
  //     throw new NotFoundException();
  //   }
  // }


}
