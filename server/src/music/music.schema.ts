import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type MusicDocument = HydratedDocument<MusicModule>;
@Schema()
export class MusicModule {
    @Prop()
    user_id: string;

    @Prop()
    is_favourite: string;

    @Prop()
    title: string;

    @Prop()
    location: string;

    @Prop()
    emotion_type: string;

}

export const MusicSchema = SchemaFactory.createForClass(MusicModule);