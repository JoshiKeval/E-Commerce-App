import { Body, Controller, Post } from '@nestjs/common';
import { AddProductDto } from 'src/dto/request/addProduct.dto';
import { AddProductRes } from 'src/dto/response/addProductRes.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private sellerService:SellerService ){}

  @Post('/addProduct')
  AddProduct(@Body() addProductDto:AddProductDto):Promise<AddProductRes>{
    return this.sellerService.AddProduct(addProductDto);
  }
}
