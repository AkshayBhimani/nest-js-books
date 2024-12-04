import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsModule } from './topic/topic.module';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: 'books',
    }),
    BooksModule,
    TopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
