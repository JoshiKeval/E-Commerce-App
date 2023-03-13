import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { AuthModule } from './auth/auth.module';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true }),SellerModule,AuthModule,AdminModule, BuyerModule],
})
export class AppModule {}
