import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  area: number;

  @Prop()
  imageUrl: string;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop({ enum: ['sale', 'rent'], required: true })
  type: string;

  @Prop({ enum: ['house', 'apartment', 'land', 'commercial'], required: true })
  propertyType: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
