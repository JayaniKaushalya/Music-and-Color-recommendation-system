import { Module } from '@nestjs/common';
import { CapturesService } from './captures.service';
import { CapturesController } from './captures.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CapturesSchema } from './captures.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Captures', schema: CapturesSchema }])],
  providers: [CapturesService],
  controllers: [CapturesController]
})
export class CapturesModule {}
