import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private usersModel: Model<Users>) { }

    async createUser(data: any): Promise<Users> {
        const userData = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            status: data.status,
            contact_no: data.contact_no,
            profile_url: data.profile_url
        };
        const user = new this.usersModel(userData);
        return await user.save();

     }
    
    async getUsers(data: any): Promise<Users> {
        const users = this.usersModel.findOne({email:data.email,password:data.password}).exec();
        // console.log(`User: ${JSON.stringify(users)}`);
        if(!users) {
            return null;
        }
        return users;
     }

    async existsUser(data: any): Promise<Users>{
        const user = this.usersModel.findOne({email:data.email}).exec();
        console.log(`Exist User: ${JSON.stringify(user)}`);
        if(!user) {
            return null;
        }
        return user;
    }

    async updateUser(id, data: any): Promise<Users> {
        const userData = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.name,
            password: data.password,
            // role: data.role,
            // status: data.status,
            contact_no: data.contact_no,
            // profile_url: data.profile_url
        };
        
        const users = await this.usersModel.findByIdAndUpdate(id, userData, { new: true });
        console.log(`User: ${JSON.stringify(users)}`);
        if(!users) {
            return null;
        }
        return users;
    }
}
