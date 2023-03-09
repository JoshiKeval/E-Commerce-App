import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class BuyerRegister {
  @OneToMany(() => Cart, (list) => list.buyer_id)
  @PrimaryGeneratedColumn("increment")
  buyer_id: number;

  @Column()
  buyer_name: string;

  @Column({ unique: true })
  buyer_email: string;

  @Column()
  buyer_password: string;
}
