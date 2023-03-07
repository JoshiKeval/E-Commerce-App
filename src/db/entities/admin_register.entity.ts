import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminRegister {
  @PrimaryGeneratedColumn("increment")
  admin_id: number;

  @Column({ length: 50 })
  admin_email: string;

  @Column({ length: 10 })
  admin_password: string;
}
