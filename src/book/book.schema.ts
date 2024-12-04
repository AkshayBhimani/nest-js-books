import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
    required: false,
  })
  topics: [Types.ObjectId];
}

export const BookSchema = SchemaFactory.createForClass(Book);
