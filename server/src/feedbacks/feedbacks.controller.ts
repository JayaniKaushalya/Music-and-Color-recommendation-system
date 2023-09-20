import { Body, Controller, Post, Res, Get, Delete, Req } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
    constructor(private feedBackService: FeedbacksService) {}

    @Post()
    async createFeedback(@Body() Body, @Res() res): Promise<any> {
        let dataBody = Body;
        try {
            console.log(`Create feedback: ${JSON.stringify(dataBody)}`);
            const feedback = await this.feedBackService.createFeedback(dataBody);
            if(!feedback) {
                const msg = `Error creating feedback: ${JSON.stringify(dataBody)}`;
                console.error(msg);
                return res.status(200).json({ message: msg, data: null, status:500});
            }
            return res.status(200).json({ message: 'Feedback created successfully', data: dataBody, status: 200 });
        } catch (error) {
            const msg = `Error creating feedback: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null, status:500 });
        }
    }

    @Get()
    async getFeedbacks(@Res() res): Promise<any> {
        try {
            const feedbacks = await this.feedBackService.getFeedbacks();
            if(!feedbacks) {
                const msg = `Error getting feedbacks`;
                console.error(msg);
                return res.status(200).json({ message: msg, data: null, status:500});
            }
            return res.status(200).json({ message: 'Feedbacks fetched successfully', data: feedbacks, status: 200 });
        } catch (error) {
            const msg = `Error getting feedbacks: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null, status:500 });
        }
    }

    @Delete('/:id')
    async deleteFeedbacks(@Req() req, @Res() res): Promise<any> {
        try {
            console.log(`Delete feedbacks: ${JSON.stringify(req.params.id)}`);
            const id = req.params.id;
            const feedbacks = await this.feedBackService.deleteFeedbacks(id);
            if(!feedbacks) {
                const msg = `Error deleting feedbacks`;
                console.error(msg);
                return res.status(200).json({ message: msg, data: null, status:500});
            }
            return res.status(200).json({ message: 'Feedbacks deleted successfully', data: feedbacks, status: 200 });
        } catch (error) {
            const msg = `Error deleting feedbacks: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null, status:500 });
        }
    }

}
