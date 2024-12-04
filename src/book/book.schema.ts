import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({})
  publishDate: Date;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({})
  topics: [Types.ObjectId];
}

export const BookSchema = SchemaFactory.createForClass(Book);
