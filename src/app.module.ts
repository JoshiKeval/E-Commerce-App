import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { AuthModule } from './auth/auth.module';
import { BuyerModule } from './buyer/buyer.module';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, BuyerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
