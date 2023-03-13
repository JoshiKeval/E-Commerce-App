import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("increment")
  admin_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
