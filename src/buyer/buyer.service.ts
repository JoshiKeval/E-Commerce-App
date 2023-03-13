import { Inject, Injectable } from "@nestjs/common";
import { BuyerRegister } from "src/db/entities/buyer_register.entity";
import { Cart } from "src/db/entities/cart.entity";
import { ProductInfo } from "src/db/entities/product_info.entity";
import { AddToCartDto } from "src/dto/request/addToCart.dto";
import { AddToCartResDto } from "src/dto/response/addToCartRes.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class BuyerService {
  private productRepo: Repository<ProductInfo>;
  private buyerRepo: Repository<BuyerRegister>;
  private cartRepo: Repository<Cart>;
  constructor(
    @Inject("DataSource")
    private dataSource: DataSource
  ) {
    this.productRepo = this.dataSource.getRepository(ProductInfo);
    this.cartRepo = this.dataSource.getRepository(Cart);
    this.buyerRepo = this.dataSource.getRepository(BuyerRegister);
  }

  async addToCart(
    addToCartDto: AddToCartDto,
    product_id,
    email
  ): Promise<AddToCartResDto> {
    //get the productPrice by id
    const getProductPrice = await (
      await this.productRepo.findOneBy({ product_id })
    ).product_price;

    // get buyer id
    const buyer_id = await (await this.buyerRepo.findOneBy({ email })).buyer_id;

    let { quantity } = addToCartDto;

    //change cartId when new user is comming
    let cartIdCount = 0;
    try {
      cartIdCount = await (await this.cartRepo.findOneBy({ buyer_id })).cart_id;

      let productRepetId = await (
        await this.cartRepo.findOneBy({ buyer_id, product_id })
      ).product_id;

      // update product quantity when the same user same produt added
      if (productRepetId == product_id) {
        let a = await await this.cartRepo.findOneBy({ buyer_id, product_id });
        a.quantity += quantity;
        a.total_amount = Number(a.total_amount) + getProductPrice * quantity;
        if (a.quantity < 0) {
          return new AddToCartResDto(
            406,
            "Not Accept Quantity Less then 0 value"
          );
        } else {
          this.cartRepo.update(
            { buyer_id: buyer_id, product_id: product_id },
            a
          );
        }
        return new AddToCartResDto(201, "Product AddtoCart Successfully!");
      }
    } catch {
      let cartArr = await this.cartRepo.find();
      let b = undefined;
      try {
        if (cartArr[0] != undefined) {
          b = cartArr.find((o) => o.buyer_id == buyer_id);
          if (buyer_id == b.buyer_id) {
            cartIdCount = b.cart_id;
          } else {
            let maxCartId = Math.max(...cartArr.map((o) => o.cart_id));
            cartIdCount = maxCartId + 1;
          }
        } else {
          cartIdCount = 1;
        }
      } catch (e) {
        let maxCartId = Math.max(...cartArr.map((o) => o.cart_id));
        cartIdCount = maxCartId + 1;
      }
    }

    const addToCart = this.cartRepo.create({
      cart_id: cartIdCount,
      quantity,
      total_amount: getProductPrice * quantity,
      buyer_id,
      product_id,
    });

    try {
      if (quantity < 0) {
        return new AddToCartResDto(
          406,
          "Not Accept Quantity Less then 0 value"
        );
      } else {
        await this.cartRepo.save(addToCart);
        return new AddToCartResDto(201, "Product AddtoCart Successfully!");
      }
    } catch (error) {
      console.log(error);
      return new AddToCartResDto(500, "Something Went Wrong!!");
    }
  }

  async updateCart() {
    return "Update Cart";
  }
}
