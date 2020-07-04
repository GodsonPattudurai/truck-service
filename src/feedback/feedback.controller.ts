import { Controller, Get, Query, Param, Patch } from "@nestjs/common";
import { FeedBackService } from "src/feedback/feedback.service";

@Controller("/feedback")
export class FeedBackController {

    constructor(private readonly feedBackService: FeedBackService) {}

    @Get("/page")
    async getFeedBacks( @Query("searchValue") searchValue: string,
        @Query("fieldToSort") fieldToSort: string, @Query("sortType") sortType: string, @Query("pageNum") pageNum: string, @Query("pageSize") pageSize: string): Promise<any> {
        return await this.feedBackService.getFeedBacks(searchValue, fieldToSort, sortType, parseInt(pageNum), parseInt(pageSize));
    }

    @Get(":id")
    async getFeedBack(@Param("id") id: string): Promise<any> {
        return await this.feedBackService.getFeedBack(id);
    }

    @Patch(":id")
    async replyFeedBack(@Param("id") id: string, @Query("reply") reply: string): Promise<any> {
        return await this.feedBackService.replyFeedBack(id, reply);
    }

}