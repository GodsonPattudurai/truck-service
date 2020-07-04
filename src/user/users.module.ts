import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/user.model";
import { UserController } from "src/user/users.controller";
import { UserService } from "src/user/users.service";

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    controllers: [UserController],
    providers: [UserService]

})
export class UserModule {

}