import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Req,
} from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Product } from "src/db/entities/product_info.entity";
import { AddProductDto } from "src/dto/request/addProduct.dto";
import { UpdateProductDto } from "src/dto/request/updateProduct.dto";
import { AddProductRes } from "src/dto/response/addProductRes.dto";
import { DeleteProductRes } from "src/dto/response/deleteProductRes.dto";
import { UpdateProductRes } from "src/dto/response/updateProductRes.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SellerService {
  private AddProductRepo: Repository<Product>;
  constructor(
    @Inject("DataSource") private dataSource: DataSource,
    public authService: AuthService
  ) {
    this.AddProductRepo = this.dataSource.getRepository(Product);
  }
  /////////////////////////////////////////////////////////////////////add-product

  async AddProduct(addData: AddProductDto, path, userdata) {
    console.log(userdata);
    const found = await this.authService.sellerRepo.findOneBy({
      email: userdata,
    });

    var sellerid = found.seller_id;
    console.log("hellloooooooooo" + sellerid);
    let {
      product_name,
      product_description,
      product_type,
      product_subtype,
      product_price,
      product_img,
      product_tag,
    } = addData;
    const data = await this.AddProductRepo.create({
      product_name,
      product_description,
      product_type,
      product_subtype,
      product_price,
      product_img: path,
      product_tag,
      seller_id: sellerid,
    });
    try {
      if (data) {
        await this.AddProductRepo.save(data);
        let res = new AddProductRes(201, "Product Added SucssesFully...");
        return res;
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  ////////////////////////////////////////////////////////////////////////get-all-products

  async GetAllProducts() {
    return this.AddProductRepo.find({ relations: ["seller_id"] });
  }

  async getProductById(id: number) {
    const found = await this.AddProductRepo.findOneBy({ product_id: id });
    if (!found) {
      throw new NotFoundException(`This Data Is NOt Found`);
    }
    return found;
  }

  ////////////////////////////////////////////////////////////////////////update-products
  async UpdateProducts(id: number, updatedata: UpdateProductDto) {
    const {
      product_name,
      product_description,
      product_type,
      product_subtype,
      product_price,
      product_img,
      product_tag,
    } = updatedata;
    const data = await this.getProductById(id);
    data.product_name = product_name;
    data.product_description = product_description;
    data.product_type = product_type;
    data.product_subtype = product_subtype;
    data.product_price = product_price;
    data.product_img = product_img;
    data.product_tag = product_tag;
    console.log(data);
    await this.AddProductRepo.update({ product_id: id }, data);
    let res = new UpdateProductRes("Product Updated Successfully...");
    return res;
  }

  ////////////////////////////////////////////////////////////////////////delete-products
  async DeleteProduct(id: number) {
    const data = await this.getProductById(id);
    if (data) {
      await this.AddProductRepo.delete(id);
      let res = new DeleteProductRes("Product Deleted SuccessFully...");
      return res;
    } else {
      throw new NotFoundException();
    }
  }
}
