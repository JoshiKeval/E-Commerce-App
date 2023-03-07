import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminRegister {
  @PrimaryGeneratedColumn("increment")
  admin_id: number;

  @Column()
  admin_email: string;

  @Column()
  admin_password: string;
}
