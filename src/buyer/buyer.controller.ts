import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AddToCartDto } from "src/dto/request/addToCart.dto";
import { AddToCartResDto } from "src/dto/response/addToCartRes.dto";
import { RoleGuard } from "src/role.guard";
import { ROLE_CONSTANT } from "src/roleConstant";
import { BuyerService } from "./buyer.service";

@Controller("buyer")
export class BuyerController {
  constructor(private buyerService: BuyerService) {}

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.BUYER))
  @Post("/addToCart/:id")
  addToCart(
    @Req() req,
    @Param("id", ParseIntPipe) id: number,
    @Body() addToCart: AddToCartDto
  ): Promise<AddToCartResDto> {
    const email = req.user.email;
    return this.buyerService.addToCart(addToCart, id, email);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.BUYER))
  @Patch("/updateCart/:id")
  updateCart() {
    return this.buyerService.updateCart();
  }
}
