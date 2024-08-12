import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserBodyDTO } from './dto/user-body-dto';
import { Created, Ok } from 'src/shared/responses/success.types';

//users controller
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

//create a new user
  @Post()
  async create(@Body() createUserDto: UserBodyDTO) {
    const user = await this.usersService.create(createUserDto);
    return new Created(user)
  }

//get all users
  @Get()
  async findAll(@Query() query: any) {
    const users = await this.usersService.findAll();
    return new Ok(users)
  }

//get user by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));
    return new Ok(user)
  }

//Update user
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<UserBodyDTO>) {
    const user = await this.usersService.update(Number(id), updateUserDto);
    return new Ok(user)
  }

//delete user
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(Number(id));
    return new Ok(user)
  }
}