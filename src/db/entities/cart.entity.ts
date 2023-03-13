import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Buyer } from "./buyer_register.entity";
import { Order } from "./order.entity";
import { Product } from "./product_info.entity";

@Entity()
export class Cart {
  @OneToMany(() => Order, (list) => list.order_id)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Buyer, (list) => list.buyer_id)
  @JoinColumn({ name: "buyer_id" })
  buyerregister: Buyer;
  @Column()
  buyer_id: number;

  @ManyToOne(() => Product, (list) => list.product_id)
  @JoinColumn({ name: "product_id" })
  productinfo: Product;
  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column({ type: "bigint" })
  total_amount: number;
}
