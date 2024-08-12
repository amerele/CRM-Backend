import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserBodyDTO } from './dto/user-body-dto';
import {
  NotFoundError,
  UnauthorizedError,
} from 'src/shared/responses/error.types';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) throw new NotFoundError('User not found');

    return user;
  }
  async isEmailExistant(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (user && user !== null) return true;

    return false;
  }
  async create(createUserDto: UserBodyDTO) {
    //Verifica se um usuário com aquele e-mail já existe
    const isEmailAlreadyExistant = await this.isEmailExistant(createUserDto.email);
    if (isEmailAlreadyExistant)
      throw new UnauthorizedError('This e-mail is already registered');

    createUserDto.email = createUserDto.email.toLowerCase()
    const user = await this.prismaService.user.create({ data: createUserDto });

    delete user.password;
    return { user };
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

    users.forEach((user) => {
      delete user.password;
    });

    return { users };
  }

  async findOne(id: number) {
    //Verifica se o usuário existe, e o retorna caso sim.
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User not Found');

    delete user.password;
    return { user };
  }

  async update(id: number, updateUserDto: Partial<UserBodyDTO>) {
    await this.findOne(id);

    const user = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });

    delete user.password;
    return { user };
  }

  async remove(id: number) {
    await this.findOne(id);

    const user = await this.prismaService.user.delete({ where: { id } });
    /* this.logger.warn(`User has been deleted : ${JSON.stringify(result)}`) */
    delete user.password;
    return { user };
  }
}
