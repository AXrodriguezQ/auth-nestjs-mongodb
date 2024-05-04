import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from '../users/dto';
import { RequestLoginDto, ResponseLoginDto } from './dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  registerUser(@Body() createLoginDto: CreateUserDto) {
    return this.loginService.registerUser(createLoginDto);
  }

  @Post()
  loginUser(@Body() createLoginDto: RequestLoginDto) {
    return this.loginService.loginUser(createLoginDto);
  }

}
