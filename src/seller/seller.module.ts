import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express/multer";
import { AuthModule } from "src/auth/auth.module";
import { DbModule } from "src/db/db.module";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";

@Module({
  imports: [DbModule,AuthModule,MulterModule.register({
    dest:'./upload',
  })],
  controllers: [SellerController],
  providers: [SellerService],
  exports:[SellerService]
})
export class SellerModule {}
