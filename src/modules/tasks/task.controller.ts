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
import { TaskService } from './task.service';
import { TaskBodyDTO } from './dto/task-body-dto';
import { Created, Ok } from 'src/shared/responses/success.types';

//tasks controller
@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) { }

//create a new task
  @Post()
  async create(@Body() createTaskDto: TaskBodyDTO) {
    const task = await this.tasksService.create(createTaskDto);
    return new Created(task)
  }

//get all tasks
  @Get()
  async findAll(@Query() query: any) {
    const tasks = await this.tasksService.findAll();
    return new Ok(tasks)
  }

//get task by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tasks = await this.tasksService.findOne(Number(id));
    return new Ok(tasks)
  }

//Update task
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: Partial<TaskBodyDTO>) {
    const task = await this.tasksService.update(Number(id), updateTaskDto);
    return new Ok(task)
  }

//delete task
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.remove(Number(id));
    return new Ok(task)
  }
}