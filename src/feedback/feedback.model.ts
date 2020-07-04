import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Decimal128 } from 'bson';

mongoose.set('debug', true);

export const FeedBackSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    personId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    rating: { type: Number, required: true },
    status: { type: String, required: true },
    feedBackDate: { type: Date, required: true},
    description: {type: String, required: true},
    reply: {type: String, required: false},
    replyDate: {type: Date, required: false}
})

export interface FeedBack extends mongoose.Document {
    _id: string,
    personId: string,
    firstName: string,
    lastName: string,
    rating: number,
    status: string,
    feedBackDate: Date,
    description: string, 
    reply: string, 
    replyDate: Date
}
