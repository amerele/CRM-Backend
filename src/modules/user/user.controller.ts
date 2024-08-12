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

//users controller
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

//create a new user
  @Post()
  create(@Body() createUserDto: UserBodyDTO) {
    return this.usersService.create(createUserDto);
  }

//get all users
  @Get()
  findAll(@Query() query: any) {

    return this.usersService.findAll();
  }

//get user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

//Update user
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<UserBodyDTO>) {
    return this.usersService.update(Number(id), updateUserDto);
  }

//delete user
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}