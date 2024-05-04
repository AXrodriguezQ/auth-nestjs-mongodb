import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true })
  username?: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'password too weak', })
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ type: String, default: 'user' })
  role: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
