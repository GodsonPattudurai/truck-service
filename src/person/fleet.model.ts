import * as mongoose from 'mongoose'
import {v4 as uuid} from 'uuid';

export const FleetSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    name: {type: String, required: true},
    address: {type: String, required: true},
    gstinNumber: {type: String, required: true},
    documentVerified: {type: Boolean, required: true}
})

export interface Fleet extends mongoose.Document {
    _id: string,
    name: string,
    address: string, 
    gstinNumber: string,
    documentVerified: boolean
}