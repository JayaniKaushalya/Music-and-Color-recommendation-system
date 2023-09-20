import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Captures } from './captures.interface';

@Injectable()
export class CapturesService {
    constructor(@InjectModel('Captures') private captureModel: Model<Captures>) {}
    
    
    async createCapture(data: any):Promise<Captures> {
        const captureDate = {
            user_id: data.user_id,
            capture_url: data.capture_url,
            expression: data.expression,
            date: data.date
        }
        const capture = new this.captureModel(captureDate);
        return await capture.save();
    }
}
