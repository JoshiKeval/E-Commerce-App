import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true }),SellerModule,AuthModule,AdminModule],
})
export class AppModule {}
