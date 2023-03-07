import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true }), SellerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
