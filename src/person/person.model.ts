import * as mongoose from 'mongoose'
import {v4 as uuid} from 'uuid';

export const PersonSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    mobileNumber: {type: String, required: true},
    gender: {type: String, required: true},
    address: {type: String, required: true},
    status: {type: String, required: true},
    documentVerified: {type: Boolean, required: true}
})

export interface Person extends mongoose.Document {
    _id: string,
    firstName: string,
    lastName: string, 
    email: string, 
    mobileNumber: string, 
    gender: string,
    address: string, 
    status: string,
    documentVerified: boolean
}
