import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedbacks } from './feedbacks.interface';

@Injectable()
export class FeedbacksService {
    constructor(@InjectModel('Feedbacks') private feedbacksModel: Model<Feedbacks>) {}

    async createFeedback(data: any): Promise<Feedbacks> {
        const feedbackData = {
            user_id: data.user_id,
            feedback: data.feedback,
            date: data.date,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            contact_no: data.contact_no
        };
        const feedback = new this.feedbacksModel(feedbackData);
        return await feedback.save();
    }

    async getFeedbacks(): Promise<Feedbacks[]> {
       // order by date desc
         return await this.feedbacksModel.find().sort({date: -1});

    }
    
    async deleteFeedbacks(id: string): Promise<any> {
        return await this.feedbacksModel.findByIdAndRemove(id);
    }

}
