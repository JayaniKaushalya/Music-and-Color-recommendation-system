import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './music.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Musics', schema: MusicSchema }])],
  providers: [MusicService],
  controllers: [MusicController]

})
export class MusicModule {}
