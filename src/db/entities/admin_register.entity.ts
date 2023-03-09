import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminRegister {
  @PrimaryGeneratedColumn("increment")
  admin_id: number;

  @Column({ unique: true })
  admin_email: string;

  @Column()
  admin_password: string;
}
