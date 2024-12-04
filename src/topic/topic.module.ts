import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsController } from './topic.controller';
import { TopicsService } from './topic.service';
import { TopicSchema } from './topic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }]),
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
