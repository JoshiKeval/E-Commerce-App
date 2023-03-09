import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductInfo } from "./product_info.entity";

@Entity()
export class SellerInfo {
  @OneToMany(() => ProductInfo, (list) => list.seller_id)
  @PrimaryGeneratedColumn("increment")
  seller_id: number;

  @Column()
  seller_name: string;

  @Column({unique:true})
  seller_email: string;

  @Column()
  contact_no: string;

  @Column()
  seller_password: string;

  @Column({unique:true})
  brand_name: string;

  @Column()
  brand_type: string;

  @Column()
  address: string;

  @Column()
  gst_no: string;

  @Column()
  pan_no: string;

  @Column()
  bank_name: string;

  @Column()
  brand_account_no: string;

  @Column()
  status: boolean;
}
