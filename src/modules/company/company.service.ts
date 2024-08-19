import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyBodyDTO } from './dto/company-body-dto';
import {
  NotFoundError,
  UnauthorizedError,
} from 'src/shared/responses/error.types';

@Injectable()
export class CompanyService {
  private logger = new Logger(CompanyService.name);
  constructor(private prismaService: PrismaService) {}

  async create(body: CompanyBodyDTO) {
    //TODO - Precisa verificar se a compania já existe mas ainda nao temos unique field

    const company = await this.prismaService.company.create({ data: body });
    return { company };
  }

  async findAll() {
    const companies = await this.prismaService.company.findMany();
    return { companies };
  }

  async findOne(id: number) {
    //Verifica se o usuário existe, e o retorna caso sim.
    const company = await this.prismaService.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundError('User not Found');

    return { company };
  }

  async update(id: number, body: Partial<CompanyBodyDTO>) {
    await this.findOne(id);

    const company = await this.prismaService.company.update({
      data: body,
      where: { id },
    });

    return { company };
  }

  async remove(id: number) {
    await this.findOne(id);

    const company = await this.prismaService.company.delete({ where: { id } });
    return { company };
  }
}
