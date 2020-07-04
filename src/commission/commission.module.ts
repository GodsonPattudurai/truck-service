import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommissionSchema } from "./commission.model";
import {CommissionSettingsSchema} from "./commission.settings.model";
import { CommissionController } from "./commission.controller";
import { CommissionService } from "./commission.service";

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Commission', schema: CommissionSchema, collection: "Commission"}]),
        MongooseModule.forFeature([{name: 'CommissionSettings', schema: CommissionSettingsSchema, collection: "CommissionSettings"}])
    ],
    controllers: [CommissionController],
    providers: [CommissionService]

})
export class CommissionModule {

}