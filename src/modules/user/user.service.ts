import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserBodyDTO } from './dto/user-body-dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private prismaService: PrismaService) { }
  
  getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }
  async create(createUserDto: UserBodyDTO) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: Partial<UserBodyDTO>) {
    const result = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
    this.logger.warn(`User has been updated : ${JSON.stringify(result)}`)
    return result
  }

  async remove(id: number) {

    const result = await this.prismaService.user.delete({ where: { id } });
    this.logger.warn(`User has been deleted : ${JSON.stringify(result)}`)
    return result
  }
}