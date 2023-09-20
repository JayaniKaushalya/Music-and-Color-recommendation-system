import { Body, Controller, Post, Res } from '@nestjs/common';
import { CapturesService } from './captures.service';

@Controller('captures')
export class CapturesController {
    constructor(private captureService: CapturesService) {}

    @Post()
    async createCapture(@Body() body: any, @Res() res: any): Promise<any> {
        console.log(`Create capture: ${JSON.stringify(body)}`);
        let dataBody = body;
        try {
            const capture = await this.captureService.createCapture(dataBody);
            if(!capture) {
                const msg = `Error creating capture: ${JSON.stringify(body)}`;
                console.error(msg);
                return res.status(500).json({ message: msg, data: null });
            }
            return res.status(200).json({ message: 'Capture created successfully', data: capture, status: 200 });
        } catch (error) {
            const msg = `Error creating capture: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null });
        };
        
     }
}
