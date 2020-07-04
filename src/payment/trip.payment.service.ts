import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TripPayments } from "src/payment/trip.payment.model";
import { PageResponseData } from "src/common/page-response-data";
import { TripPaymentSettings } from "src/payment/trip.payment.settings.model";

@Injectable()
export class TripPaymentService {

    constructor( @InjectModel('TripPayments') private readonly tripPaymentsModel: Model<TripPayments>,
    @InjectModel('TripPaymentSettings') private readonly tripPaymentsSettingsModel: Model<TripPaymentSettings>) { }

    async getTripPayments(searchValue: string, fieldToSort: string, sortType: string, pageNum: number, pageSize: number): Promise<any> {
        searchValue = searchValue || '';
        pageNum = pageNum || 0;
        pageSize = pageSize || 0;
        let sortParam = {};
        sortParam[fieldToSort] = (sortType == 'DESC') ? '-1' : '1';
        let tripPayments = await this.tripPaymentsModel.find({ $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { vehicleNumber: { $regex: searchValue, $options: 'i' } }] })
            .sort(sortParam)
            .skip(pageNum > 0 ? pageNum * pageSize : 0)
            .limit(pageSize).exec();
        let count = await this.tripPaymentsModel.find({ $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { vehicleNumber: { $regex: searchValue, $options: 'i' } }] }).countDocuments();
        return new PageResponseData(tripPayments, count);
    }

    async updateTripPaymentSettings(tripPaymentSettings: TripPaymentSettings): Promise<any> {
        const updateTripPaymentSettings = await this.tripPaymentsSettingsModel.findByIdAndUpdate(tripPaymentSettings._id, tripPaymentSettings);
        return updateTripPaymentSettings;
    }

    async getTripPaymentSettings(): Promise<any> {
        return await this.tripPaymentsSettingsModel.findOne();
    }
}