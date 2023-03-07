import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbConnection } from "./db.config";

@Module({
  imports: [ConfigModule],
  providers: [...DbConnection],
  exports: [...DbConnection],
})
export class DbModule {}
