import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FeedbacksDocument = HydratedDocument<FeedbacksModule>;
@Schema()
export class FeedbacksModule {
    @Prop()
    user_id: string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string;

    @Prop()
    contact_no: string;

    @Prop()
    feedback: string;

    @Prop()
    date: string;

}
export const FeedbacksSchema = SchemaFactory.createForClass(FeedbacksModule);