import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { UpdateSellerStatusDto } from "src/dto/request/updatesellerstatus.dto";
import { DeleteSellerResDto } from "src/dto/response/deletesellerbyadminRes.dto";
import { UpdateMessageRes } from "src/dto/response/updatestatusmsgRes.dto";
import { RoleGuard } from "src/role.guard";
import { ROLE_CONSTANT } from "src/roleConstant";

import { AdminService } from "./admin.service";

@ApiTags("Admin-Portal")
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("/getallsellers")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.ADMIN))
  async GetAllSeller() {
    const getall = await this.adminService.GetAllSellers();
    return getall;
  }

  @Patch("/updatestatus/:id")
  @UseGuards(AuthGuard("jwt"), new RoleGuard(ROLE_CONSTANT.ROLES.ADMIN))
  UpdateSellerStatus(
    @Param("id") id: number,
    @Body() updateSellerStatusDto: UpdateSellerStatusDto
  ): Promise<UpdateMessageRes> {
    return this.adminService.UpdateStatus(id, updateSellerStatusDto);
  }

  // @Delete("/deleteseller/:id")
  // DeleteProduct(@Param("id") id: number): Promise<DeleteSellerResDto> {
  //   return this.adminService.DeleteSeller(id);
  // }
}
