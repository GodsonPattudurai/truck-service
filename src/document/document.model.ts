import * as mongoose from 'mongoose';
import {v4 as uuid} from 'uuid';

export const DocumentSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    entityType: {type: String, required: true},
    entityId: {type: String, required: true},
    documentType: {type: String, required: true},
    url: {type: String, required: false},
    status: {type: String, required: true}
})

export interface Document extends mongoose.Document {
    id: string;
    entityType: string;
    entityId: string;
    documentType: string;
    url: string;
    status: string;
}