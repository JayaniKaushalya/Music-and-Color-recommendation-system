import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Musics } from './music.interface';
var mongoose = require('mongoose');

@Injectable()
export class MusicService {
    constructor(@InjectModel('Musics') private musicsModel: Model<Musics>) { }


    async getUsers(data: any) {
        // console.log('music get user data :', data)
        const usersM =await this.musicsModel.find({user_id:data.user_id}).exec();
        console.log(`User: ${JSON.stringify(usersM)}`);
        // if(!usersM) {
        //     return null;
        // }
        return usersM;
    }

    async createMusic(data: any) {
        const musicData = {
            music_type : data.music_type,
            title : data.title,
            location: data.location,
            is_favourite : data.is_favourite,
            emotion_type : data.emotion_type,
            category : data.category,
            user_id: data.user_id
        };
        const music = new this.musicsModel(musicData);
        return await music.save();
    }

    async deleteMusic(data: any) {
        console.log('delete function called: ', data.id)
        const musicData = {
            music_type : data.id,
        };
        // var iid = mongoose.mongo.BSONPure.ObjectID.fromHexString(data.id)
        await this.musicsModel.findByIdAndDelete({_id: data.id});
        return 'success';
    }
}
