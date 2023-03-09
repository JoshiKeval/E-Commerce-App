import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express/multer";
import { DbModule } from "src/db/db.module";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";

@Module({
  imports: [DbModule,MulterModule.register({
    dest:'./upload',
  })],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
