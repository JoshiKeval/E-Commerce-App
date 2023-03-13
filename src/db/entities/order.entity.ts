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

  @Column()
  address: string;

  @Column()
  contact_no: string;

  @JoinColumn({ name: "product_id" })
  cart_id: number;
}
