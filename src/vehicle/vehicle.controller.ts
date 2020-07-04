import {Controller, Get, Param} from "@nestjs/common";
import {VehicleService} from "./vehicle.service";
import { Vehicle } from "src/vehicle/vehicle.model";

@Controller("vehicles")
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService){}

    @Get("/fleet/:fleetId")
    async getVehicles(@Param("fleetId") fleetId: string): Promise<Vehicle[]> {
        return await this.vehicleService.getVehicles(fleetId);
    }
}