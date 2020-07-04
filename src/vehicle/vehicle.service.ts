import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";

import {Vehicle} from "./vehicle.model";

@Injectable()
export class VehicleService {

    constructor(
        @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
    ) { }

    async getVehicles(fleetIdentifier: string): Promise<Vehicle[]> {
        return await this.vehicleModel.find({fleetId: fleetIdentifier}).exec();
    }
}