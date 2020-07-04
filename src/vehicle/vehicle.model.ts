import * as mongoose from 'mongoose';
import {v4 as uuid} from 'uuid';
import { Decimal128 } from 'bson';

mongoose.set('debug', true);

export const VehicleSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    fleetId: {type: String, required: true},
    engineNumber: {type: String, required: true},
    mileage: {type: Number, required: true},
    regNumber: {type: String, required: true},
    type: {type: String, required: true}
})

export interface Vehicle extends mongoose.Document {
    id: string,
    fleetId: string, 
    engineNumber: string, 
    mileage: number,
    regNumber: string,
    type: string
}
