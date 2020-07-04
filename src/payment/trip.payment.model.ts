import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Decimal128 } from 'bson';

mongoose.set('debug', true);

export const TripPaymentsSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    personId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    payment: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    tripDate: { type: Date, required: true }
})

export interface TripPayments extends mongoose.Document {
    _id: string,
    personId: string,
    vehicleId: string,
    firstName: string,
    lastName: string,
    payment: number,
    paymentStatus: string,
    tripDate: Date
}
