import { Body, Controller, Res, Post, Delete } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private musicService: MusicService) {
    }

    @Post('getusers')
    async getUsers(@Body() Body, @Res() res: any): Promise<any> {
        console.log(`Get users: ${JSON.stringify(Body)}`);
        let dataBody = Body;
        try {
            const users = await this.musicService.getUsers(dataBody);
            if(!users) {
                const msg = `Can not found user of : ${JSON.stringify(Body)}`;
                console.log(msg);
                return res.status(200).json({ message: msg, data: null, status: 401 });
            }
            return res.status(200).json({ message: 'User retrieved successfully', data: users, status: 200 });
        } catch (error) {
            const msg = `Unexprected Error getting user: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null, status: 500 });
        };
    }

    @Post('createmusic')
    async CreateMusic(@Body() Body, @Res() res: any): Promise<any> {
        console.log(`Create User: ${JSON.stringify(Body)}`);
        let dataBody = Body;
        try {
            const users = await this.musicService.createMusic(dataBody);
            if(!users) {
                const msg = `Can not create music of : ${JSON.stringify(Body)}`;
                console.log(msg);
                return res.status(200).json({ message: msg, data: null, status: 401 });
            }
            return res.status(200).json({ message: 'Music created successfully', data: users, status: 200 });
        } catch (error) {
            const msg = `Unexprected Error create music: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null, status: 500 });
        };
    }

    @Post('deletemusic')
    async DeleteMusic(@Body() Body, @Res() res: any): Promise<any> {
        console.log(`Delete User: ${JSON.stringify(Body)}`);
        let dataBody = Body;
        try {
            const users = await this.musicService.deleteMusic(dataBody);
            if(!users) {
                const msg = `Can not delete music of : ${JSON.stringify(Body)}`;
                console.log(msg);
                return res.status(200).json({ message: msg, data: null, status: 401 });
            }
            return res.status(200).json({ message: 'Music delete successfully', data: users, status: 200 });
        } catch (error) {
            const msg = `Unexprected Error delete music: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null, status: 500 });
        };
    }
}
