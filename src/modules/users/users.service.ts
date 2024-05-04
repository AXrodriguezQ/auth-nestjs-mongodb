import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name) private readonly userModel: Model<User> ) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    
    const verifyEmail = await this.userModel.findOne( { email: createUserDto.email } ).exec()

    if (verifyEmail) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)

    if ( createUserDto.role ) if ( createUserDto.role != 'admin')throw new HttpException(`The ${createUserDto.role} role is not supported`, HttpStatus.NOT_ACCEPTABLE)


    await new this.userModel(createUserDto).save()

    return 'user created successfully!'

  }

  async findAllUsers(): Promise<User[]> {
    
    return this.userModel.find().exec()

  }

  findOneUser(id: string): Promise<User[]> {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException(`User with id ${id} not found`)

    return updatedUser;
  }

  async removeUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`)
  }
}
