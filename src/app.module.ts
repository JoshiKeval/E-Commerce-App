import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true }), SellerModule,AuthModule],
})
export class AppModule {}
