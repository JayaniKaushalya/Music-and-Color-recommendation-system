import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type CapturesDocument = HydratedDocument<CapturesModule>;
@Schema()
export class CapturesModule {
    @Prop()
    user_id: string;

    @Prop()
    date: string;

    @Prop()
    expression: string;

    @Prop()
    capture_url: string;

}

export const CapturesSchema = SchemaFactory.createForClass(CapturesModule);