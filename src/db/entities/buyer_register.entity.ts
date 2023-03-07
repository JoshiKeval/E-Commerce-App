import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class BuyerRegister {
  @OneToMany(() => Cart, (list) => list.buyer_id)
  @PrimaryGeneratedColumn("increment")
  buyer_id: number;

  @Column({ length: 50 })
  buyer_name: string;

  @Column({ length: 50 })
  buyer_email: string;

  @Column({ length: 50 })
  buyer_password: string;
}
