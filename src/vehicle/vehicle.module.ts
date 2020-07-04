import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleSchema } from "./vehicle.model";
import { VehicleController } from "./vehicle.controller";
import { VehicleService } from "./vehicle.service";

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Vehicle', schema: VehicleSchema, collection: "Vehicle"}])
    ],
    controllers: [VehicleController],
    providers: [VehicleService]

})
export class VehicleModule {

}