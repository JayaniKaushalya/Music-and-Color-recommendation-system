// create users schema for mongoose

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop()
    status: string;

    @Prop()
    contact_no: string;

    @Prop()
    profile_url: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

