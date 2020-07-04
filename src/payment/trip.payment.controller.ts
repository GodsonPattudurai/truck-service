import { Controller, Get, Query, Body, Put } from "@nestjs/common";
import { TripPaymentService } from "src/payment/trip.payment.service";
import { TripPaymentSettings } from "src/payment/trip.payment.settings.model";

@Controller("trippayments")
export class TripPaymentsController {

    constructor(private readonly tripPaymentService: TripPaymentService) { }

    @Get("/page")
    async getTripPayments( @Query("searchValue") searchValue: string,
        @Query("fieldToSort") fieldToSort: string, @Query("sortType") sortType: string, @Query("pageNum") pageNum: string, @Query("pageSize") pageSize: string): Promise<any> {
        return await this.tripPaymentService.getTripPayments(searchValue, fieldToSort, sortType, parseInt(pageNum), parseInt(pageSize));
    }

    @Put("/settings")
    async updateTripPaymentSettings(@Body() tripPaymentSettings: TripPaymentSettings): Promise<any> {
        return await this.tripPaymentService.updateTripPaymentSettings(tripPaymentSettings);
    }

    @Get("/settings")
    async getTripPaymentSettings(): Promise<any> {
        return await this.tripPaymentService.getTripPaymentSettings();
    }


}