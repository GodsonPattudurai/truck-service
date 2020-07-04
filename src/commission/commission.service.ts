import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Commission } from "src/commission/commission.model";
import { PageResponseData } from "src/common/page-response-data";
import { CommissionSettings } from "src/commission/commission.settings.model";

@Injectable()
export class CommissionService {

    constructor(
        @InjectModel('Commission') private readonly commissionModel: Model<Commission>,
        @InjectModel('CommissionSettings') private readonly commissionSettingsModel: Model<CommissionSettings>
    ) {}

    async getCommissions(searchValue: string, fieldToSort: string, sortType: string, pageNum: number, pageSize: number): Promise<any> {
        searchValue = searchValue || '';
        pageNum = pageNum || 0;
        pageSize = pageSize || 0;
        let sortParam = {};
        sortParam[fieldToSort] = (sortType == 'DESC') ? '-1' : '1';
        let commissions = await this.commissionModel.find({ $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { mobileNumber: { $regex: searchValue, $options: 'i' } }] })
                          .sort(sortParam)
                          .skip(pageNum > 0 ? pageNum * pageSize : 0)
                          .limit(pageSize).exec();
        let count = await this.commissionModel.find({$or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }, { mobileNumber: { $regex: searchValue, $options: 'i' } }] }).countDocuments();
        return new PageResponseData(commissions, count);
    }

    async getCommissionSettings(): Promise<any> {
        return await this.commissionSettingsModel.findOne();
    }

    async updateCommissionSettings(commissionSettings: CommissionSettings): Promise<any> {
        const updateCommissionSettings = await this.commissionSettingsModel.findByIdAndUpdate(commissionSettings._id, commissionSettings);
        return updateCommissionSettings;
    }
}