import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { BuyerRegister } from "./entities/buyer_register.entity";
import { AdminRegister } from "./entities/admin_register.entity";
import { SellerInfo } from "./entities/seller_info.entity";
import { ProductInfo } from "./entities/product_info.entity";
import { Cart } from "./entities/cart.entity";
import { Order } from "./entities/order.entity";
export const DbConnection = [
  {
    provide: "DataSource",
    useFactory: async (configService: ConfigService) => {
      const datasource = new DataSource({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        synchronize: true,
        entities: [
          BuyerRegister,
          AdminRegister,
          SellerInfo,
          ProductInfo,
          Cart,
          Order,
        ],
        logging: true,
      });

      return await datasource.initialize();
    },
    inject: [ConfigService],
  },
];
