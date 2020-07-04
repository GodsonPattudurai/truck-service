import * as mongoose from 'mongoose';
import {v4 as uuid} from 'uuid';
import { Decimal128 } from 'bson';

mongoose.set('debug', true);

export const CommissionSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    personId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobileNumber: {type: String, required: true},
    totalBalance: {type: Number, required: true},
    actualKoolyIncome: {type: Number, required: true}
})

export interface Commission extends mongoose.Document {
    _id: string,
    personId: string, 
    firstName: string, 
    lastName: string, 
    mobileNumber: string, 
    totalBalance: number,
    actualKoolyIncome: number
}
