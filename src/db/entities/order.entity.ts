import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  order_id: number;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 10 })
  contact_no: string;


  @ManyToOne(() => Cart, (list) => list.cart_id)
  @JoinColumn({ name: "product_id" })
  cart_id: number;
}
