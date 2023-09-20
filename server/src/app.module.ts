import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CapturesModule } from './captures/captures.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { MusicController } from './music/music.controller';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.mongoDbUrl),
    UsersModule,
    CapturesModule,
    FeedbacksModule,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
