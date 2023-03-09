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
} from "@nestjs/common";
import { Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
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
import { SellerService } from "./seller.service";

@Controller("seller")
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Post("/addProduct")
  @UseInterceptors(FileInterceptor("product_img", storage))
  AddProduct(@UploadedFile(new ParseFilePipe({validators: [
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],}))
    file: Express.Multer.File,@Body() addProductDto: AddProductDto): Promise<AddProductRes> {
    return this.sellerService.AddProduct(addProductDto, file.filename);
  }

  @Get("/getallproducts")
  async GetAllProducts() {
    const getall = await this.sellerService.GetAllProducts();
    return getall;
  }

  @Get("/:id")
  async getTaskById(@Param("id") id: number): Promise<ProductInfo> {
    return await this.sellerService.getProductById(id);
  }

  @Patch("/update/:id")
  UpdateProduct(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.sellerService.UpdateProducts(id, updateProductDto);
  }

  @Delete("/delete/:id")
  DeleteProduct(@Param("id") id: number): Promise<DeleteProductRes> {
    return this.sellerService.DeleteProduct(id);
  }
}
function uuidv4() {
  throw new Error("Function not implemented.");
}
