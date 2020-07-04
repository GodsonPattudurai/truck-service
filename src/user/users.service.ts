import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";

import { User } from "./user.model";

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async insertUser(firstName: string, lastName: string) {
        const newUser = new this.userModel({
            firstName,
            lastName
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map(user =>({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }));
    }


}