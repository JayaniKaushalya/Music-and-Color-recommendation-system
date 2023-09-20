import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbacksSchema } from './feedbacks.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Feedbacks', schema: FeedbacksSchema }])],
  providers: [FeedbacksService],
  controllers: [FeedbacksController]
})
export class FeedbacksModule {}
