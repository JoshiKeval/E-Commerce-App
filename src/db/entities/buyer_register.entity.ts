import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class Buyer {
  @OneToMany(() => Cart, (list) => list.buyer_id)
  @PrimaryGeneratedColumn("increment")
  buyer_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
