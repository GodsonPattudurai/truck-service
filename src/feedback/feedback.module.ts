import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FeedBackSchema } from "./feedback.model";
import { FeedBackController } from "./feedback.controller";
import { FeedBackService } from "./feedback.service";

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Feedback', schema: FeedBackSchema, collection: "Feedback"}])
    ],
    controllers: [FeedBackController],
    providers: [FeedBackService]

})
export class FeedBackModule {

}