import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class ResponseLoginDto {

    @IsNotEmpty()
    id: ObjectId

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    token: string;
    
}
