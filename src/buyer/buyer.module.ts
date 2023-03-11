import { Module } from "@nestjs/common";
import { BuyerService } from "./buyer.service";
import { BuyerController } from "./buyer.controller";
import { AuthModule } from "src/auth/auth.module";
import { DbModule } from "src/db/db.module";

@Module({
  imports: [DbModule, AuthModule],
  providers: [BuyerService],
  controllers: [BuyerController],
})
export class BuyerModule {}
