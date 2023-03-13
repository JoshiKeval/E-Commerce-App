import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports:[DbModule,AuthModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
