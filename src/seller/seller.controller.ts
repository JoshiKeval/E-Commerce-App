import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  UseGuards,
} from "@nestjs/common";
import { Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";
import { ProductInfo } from "src/db/entities/product_info.entity";
import { storage } from "src/db/storage.helper";
import { AddProductDto } from "src/dto/request/addProduct.dto";
import { UpdateProductDto } from "src/dto/request/updateProduct.dto";
import { AddProductRes } from "src/dto/response/addProductRes.dto";
import { DeleteProductRes } from "src/dto/response/deleteProductRes.dto";
import { UpdateProductRes } from "src/dto/response/updateProductRes.dto";
import { RoleGuard } from "src/role.guard";
import { ROLE_CONSTANT } from "src/roleConstant";
import { SellerService } from "./seller.service";

@Controller("seller")
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  @Post("/addProduct")
  @UseInterceptors(FileInterceptor("product_img", storage))
  AddProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      })
    )
    file: Express.Multer.File,
    @Body() addProductDto: AddProductDto
  ): Promise<AddProductRes> {
    return this.sellerService.AddProduct(addProductDto, file.filename);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  @Get("/getallproducts")
  async GetAllProducts() {
    const getall = await this.sellerService.GetAllProducts();
    return getall;
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  @Get("/:id")
  async getTaskById(@Param("id") id: number): Promise<ProductInfo> {
    return await this.sellerService.getProductById(id);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  @Patch("/update/:id")
  UpdateProduct(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.sellerService.UpdateProducts(id, updateProductDto);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.SELLER))
  @Delete("/delete/:id")
  DeleteProduct(@Param("id") id: number): Promise<DeleteProductRes> {
    return this.sellerService.DeleteProduct(id);
  }
}
