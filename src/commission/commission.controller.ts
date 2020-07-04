import { Controller, Query, Get, Put, Body } from "@nestjs/common";
import { CommissionService } from "src/commission/commission.service";
import { CommissionSettings } from "src/commission/commission.settings.model";

@Controller("commissions")
export class CommissionController {

    constructor(private readonly commissionService: CommissionService) {

    }

    @Get("/page")
    async getCommissions( @Query("searchValue") searchValue: string,
        @Query("fieldToSort") fieldToSort: string, @Query("sortType") sortType: string, @Query("pageNum") pageNum: string, @Query("pageSize") pageSize: string): Promise<any> {
        return await this.commissionService.getCommissions(searchValue, fieldToSort, sortType, parseInt(pageNum), parseInt(pageSize));
    }

    @Get("/settings")
    async getCommissionSettings(): Promise<any> {
        return await this.commissionService.getCommissionSettings();
    }

    @Put("/settings")
    async updateCommissionSettings(@Body() commissionSettings: CommissionSettings): Promise<any> {
        return await this.commissionService.updateCommissionSettings(commissionSettings);
    }
}