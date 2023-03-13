import { Inject, Injectable } from "@nestjs/common";
import { Buyer } from "src/db/entities/buyer_register.entity";
import { Cart } from "src/db/entities/cart.entity";
import { Product } from "src/db/entities/product_info.entity";
import { AddToCartDto } from "src/dto/request/addToCart.dto";
import { AddToCartResDto } from "src/dto/response/addToCartRes.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class BuyerService {
  private productRepo: Repository<Product>;
  private buyerRepo: Repository<Buyer>;
  private cartRepo: Repository<Cart>;
  constructor(
    @Inject("DataSource")
    private dataSource: DataSource
  ) {
    this.productRepo = this.dataSource.getRepository(Product);
    this.cartRepo = this.dataSource.getRepository(Cart);
    this.buyerRepo = this.dataSource.getRepository(Buyer);
  }

  async addToCart(
    addToCartDto: AddToCartDto,
    product_id,
    email
  ): Promise<AddToCartResDto> {
    //get the product
    let getProduct = await this.productRepo.findOneBy({ product_id });

    // get buyer
    let buyer = await this.buyerRepo.findOneBy({ email });

    let { quantity } = addToCartDto;

    try {
      let productRepetId = await this.cartRepo.findOneBy({
        buyer_id: buyer.buyer_id,
        product_id,
      });

      // update product quantity when the same user add same product
      if (productRepetId.product_id == product_id) {
        productRepetId.quantity += quantity;
        productRepetId.total_amount =
          Number(productRepetId.total_amount) +
          getProduct.product_price * quantity;

        if (productRepetId.quantity < 0) {
          return new AddToCartResDto(
            406,
            "Not Accept Quantity Less then 0 value"
          );
        } else {
          this.cartRepo.update(
            { buyer_id: buyer.buyer_id, product_id: product_id },
            productRepetId
          );
        }

        return new AddToCartResDto(201, "Product AddtoCart Successfully!");
      }
    } catch {
      var addToCart = this.cartRepo.create({
        quantity,
        total_amount: getProduct.product_price * quantity,
        buyer_id: buyer.buyer_id,
        product_id,
      });
    }

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
      return new AddToCartResDto(500, "Something Went Wrong!!");
    }
  }

  async updateCart() {
    return "Update Cart";
  }
}
