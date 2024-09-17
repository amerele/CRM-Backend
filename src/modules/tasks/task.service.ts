import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskBodyDTO } from './dto/task-body-dto';
import {
  NotFoundError,
  UnauthorizedError,
} from 'src/shared/responses/error.types';
import { missingFields } from 'src/shared/filters/missingFields.filter';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async create({ }: TaskBodyDTO) {
    
    //Verifica preenchimento dos campos
    const fields = missingFields({

    });
    if (fields)
      throw new UnauthorizedError(`Please enter the missing fields: ${fields}`);

    const task = await this.prismaService.task.create({
      data: {  },
    });
    return { task };
  }

  async findAll() {
    const tasks = await this.prismaService.task.findMany();
    return { tasks };
  }

  async findOne(id: number) {
    const task = await this.prismaService.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundError('Task not Found');

    return { task };
  }

  async update(id: number, body: Partial<TaskBodyDTO>) {
    await this.findOne(id);

    const task = await this.prismaService.task.update({
      data: body,
      where: { id },
    });

    return { task };
  }

  async remove(id: number) {
    await this.findOne(id);

    const task = await this.prismaService.task.delete({ where: { id } });
    return { task };
  }
}
