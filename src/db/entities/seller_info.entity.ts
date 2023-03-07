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

  @Column({ length: 50 })
  seller_name: string;

  @Column({ length: 50 })
  seller_email: string;

  @Column({ length: 10 })
  contact_no: string;

  @Column({ length: 50 })
  seller_password: string;

  @Column({ length: 50 })
  brand_name: string;

  @Column({ length: 50 })
  brand_type: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 50 })
  gst_no: string;

  @Column({ length: 50 })
  pan_no: string;

  @Column({ length: 50 })
  bank_name: string;

  @Column({ length: 50 })
  brand_account_no: string;

  @Column()
  status: boolean;
}
