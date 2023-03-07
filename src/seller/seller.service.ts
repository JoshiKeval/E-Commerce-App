import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { ProductInfo } from "src/db/entities/product_info.entity";
import { AddProductDto } from "src/dto/request/addProduct.dto";
import { AddProductRes } from "src/dto/response/addProductRes.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SellerService {
  private AddProductRepo: Repository<ProductInfo>;
  constructor(@Inject("DataSource") private dataSource: DataSource) {
    this.AddProductRepo = this.dataSource.getRepository(ProductInfo);
  }

  async AddProduct(addData: AddProductDto) {
    const {
      product_name,
      product_description,
      product_type,
      product_subtype,
      product_price,
      product_img,
      product_tag,
      seller_id,
    } = addData;
    const data = await this.AddProductRepo.create({
      product_name,
      product_description,
      product_type,
      product_subtype,
      product_price,
      product_img,
      product_tag,
      seller_id,
    });
   try {
    if(data){
      await this.AddProductRepo.save(data);
      let res = new AddProductRes("Product Added SucssesFully...");
      return res;
    }else{
      throw new BadRequestException();
    }
   } catch (error) {
    throw new BadRequestException(error)
   }
 
  }
}
