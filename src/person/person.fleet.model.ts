import * as mongoose from 'mongoose'
import {v4 as uuid} from 'uuid';

export const PersonFleetSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    personId: {type: String, required: true},
    fleetId: {type: String, required: true},
    personType: {type: [String], required: true},
})

export interface PersonFleet extends mongoose.Document {
    _id: string,
    personId: string,
    fleetId: string,
    personType: [string]

}