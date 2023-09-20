import { Body, Controller, Get, Post, Put, Res, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    async createUser(@Body() body: any, @Res() res: any): Promise<any> {
        console.log(`Create user: ${JSON.stringify(body)}`);
        let dataBody = body;
        try {
            const userExists = await this.usersService.existsUser(dataBody);
            if(!userExists) {    
                const user = await this.usersService.createUser(dataBody);
                if(!user) {
                    const msg = `Error creating user: ${JSON.stringify(body)}`;
                    console.error(msg);
                    return res.status(500).json({ message: msg, data: null });
                }
                return res.status(200).json({ message: 'User created successfully', data: user, status: 200 });
            } else {
                const msg = `User already exists: ${JSON.stringify(body)}`;
                console.log(msg);
                return res.status(200).json({ message: msg, data: null, status: 409 });
            }
        } catch (error) {
            const msg = `Error creating user: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null });
        };
        
     }

    @Post('login')
    async getUsers(@Body() Body, @Res() res: any): Promise<any> {
        console.log(`Get users: ${JSON.stringify(Body)}`);
        let dataBody = Body;
        try {
            const users = await this.usersService.getUsers(dataBody);
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

    @Put('/:userID')
    async updateUser(@Body() body: any,@Param('userID') _id, @Res() res: any): Promise<any> {
        console.log(`Update user: ${JSON.stringify(body)}`);
        let dataBody = body;
        try {
            const data = await this.usersService.updateUser(_id,dataBody);
            if(!data) {
                const msg = `Can not found user of : ${JSON.stringify(body)}`;
                console.error(msg);
                return res.status(404).json({ message: msg, data: null });
            }
            return res.status(200).json({ message: 'User updated successfully', data: data, status: 200 });
        } catch (error) {
            const msg = `Unexprected Error updating user: ${error.message}`;
            console.error(msg);
            return res.status(500).json({ message: msg, data: null });
        }
    }
    
}
