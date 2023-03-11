import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BuyerRegister } from "./buyer_register.entity";
import { Order } from "./order.entity";
import { ProductInfo } from "./product_info.entity";

@Entity()
export class Cart {
  @OneToMany(() => Order, (list) => list.order_id)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  cart_id: number;

  @ManyToOne(() => BuyerRegister, (list) => list.buyer_id)
  @JoinColumn({ name: "buyer_id" })
  buyerregister: BuyerRegister;
  @Column()
  buyer_id: number;

  @ManyToOne(() => ProductInfo, (list) => list.product_id)
  @JoinColumn({ name: "product_id" })
  productinfo: ProductInfo;
  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column({ type: "bigint" })
  total_amount: number;
}
