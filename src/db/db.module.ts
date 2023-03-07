import { Module } from "@nestjs/common";
import { DbService } from "./db.service";
import { ConfigModule } from "@nestjs/config";
import { DbConnection } from "./db.config";

@Module({
  imports: [ConfigModule],
  providers: [...DbConnection, DbService],
  exports: [...DbConnection],
})
export class DbModule {}
