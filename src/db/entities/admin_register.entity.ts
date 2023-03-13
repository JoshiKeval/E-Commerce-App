import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminRegister {
  @PrimaryGeneratedColumn("increment")
  admin_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
