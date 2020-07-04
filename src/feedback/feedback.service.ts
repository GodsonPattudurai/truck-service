import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FeedBack } from "src/feedback/feedback.model";
import { PageResponseData } from "src/common/page-response-data";
import { FEEDBACK_STATUS_APPROVED } from "src/common/constants";

 @Injectable()
 export class FeedBackService {

    constructor(@InjectModel('Feedback') private readonly feedBackModel: Model<FeedBack>){}

    async getFeedBacks(searchValue: string, fieldToSort: string, sortType: string, pageNum: number, pageSize: number): Promise<any> {
        searchValue = searchValue || '';
        pageNum = pageNum || 0;
        pageSize = pageSize || 0;
        let sortParam = {};
        sortParam[fieldToSort] = (sortType == 'DESC') ? '-1' : '1';
        let feedBacks = await this.feedBackModel.find({ $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }] })
            .sort(sortParam)
            .skip(pageNum > 0 ? pageNum * pageSize : 0)
            .limit(pageSize).exec();
        let count = await this.feedBackModel.find({ $or: [{ firstName: { $regex: searchValue, $options: 'i' } }, { lastName: { $regex: searchValue, $options: 'i' } }] }).countDocuments();
        return new PageResponseData(feedBacks, count);
    }

    async getFeedBack(id: string): Promise<any> {
        return await this.feedBackModel.findById(id).exec();
    }

    async replyFeedBack(id: string, replyVal: string): Promise<any> {
        return await this.feedBackModel.findByIdAndUpdate(id, {status: FEEDBACK_STATUS_APPROVED, reply: replyVal, replyDate: new Date()}).exec();
    }
 }