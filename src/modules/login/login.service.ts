import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { RequestLoginDto } from './dto';
import { CreateUserDto } from '../users/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {

  constructor( @InjectModel(User.name) private readonly userModel: Model<User> ) {}

  async registerUser( createLoginDto: CreateUserDto ) {
    const verifyEmail = await this.userModel.findOne( { email: createLoginDto.email } ).exec()

    if (verifyEmail) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)

    if ( createLoginDto.role ) if ( createLoginDto.role != 'admin')throw new HttpException(`The ${createLoginDto.role} role is not supported`, HttpStatus.NOT_ACCEPTABLE)

    const saltOrRounds = await bcrypt.genSalt();
    bcrypt.hash(createLoginDto.password, saltOrRounds);

    await new this.userModel(createLoginDto).save()

    return 'token'
  }

  async loginUser( loginUser: RequestLoginDto ) {

    const verifyUser = await this.userModel.findOne( { email: loginUser.email } ).exec()

    bcrypt.compare(verifyUser.password);

  }

}
