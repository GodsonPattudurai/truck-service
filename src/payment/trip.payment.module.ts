import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TripPaymentsSchema } from "./trip.payment.model";
import { TripPaymentsController } from "./trip.payment.controller";
import { TripPaymentService } from "./trip.payment.service";
import { TripPaymentSettingsSchema } from "src/payment/trip.payment.settings.model";

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'TripPayments', schema: TripPaymentsSchema, collection: "TripPayments"}]),
        MongooseModule.forFeature([{name: 'TripPaymentSettings', schema: TripPaymentSettingsSchema, collection: "TripPaymentSettings"}])
    ],
    controllers: [TripPaymentsController],
    providers: [TripPaymentService]

})
export class TripPaymentsModule {

}