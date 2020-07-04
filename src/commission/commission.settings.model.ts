import * as mongoose from 'mongoose';
import {v4 as uuid} from 'uuid';

mongoose.set('debug', true);

export const CommissionSettingsSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    cronSetting: {type: String, required: true},
    description: {type: String, required: true}
})

export interface CommissionSettings extends mongoose.Document {
    _id: string,
    cronSetting: string, 
    description: string
}
