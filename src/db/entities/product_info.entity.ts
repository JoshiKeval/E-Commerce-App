import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { SellerInfo } from "./seller_info.entity";

@Entity()
export class ProductInfo {
  @OneToMany(() => Cart, (k) => k.product_id)
  @PrimaryGeneratedColumn("increment")
  product_id: number;

  @Column({ length: 50 })
  product_name: string;

  @Column({ length: 200 })
  product_description: string;

  @Column({ length: 20 })
  product_type: string;

  @Column({ length: 50 })
  product_subtype: string;

  @Column()
  product_price: number;

  @Column({ length: 50 })
  product_img: string;

  @Column({array: true})
  product_tag: string;

  @ManyToOne(() => SellerInfo, (list) => list.seller_id)
  @JoinColumn({ name: "seller_id" })
  seller_id: string;
}
