import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyBodyDTO } from './dto/company-body-dto';
import {
  NotFoundError,
  UnauthorizedError,
} from 'src/shared/responses/error.types';
import { missingFields } from 'src/shared/filters/missingFields.filter';

@Injectable()
export class CompanyService {
  private logger = new Logger(CompanyService.name);
  constructor(private prismaService: PrismaService) {}

  async create({ companyName, location }: CompanyBodyDTO) {
    //Verifica preenchimento dos campos
    const fields = missingFields({ companyName, location });
    if (fields) {
      console.log(fields);
      throw new UnauthorizedError(`Please enter the missing fields: ${fields}`);
    }

    //TODO - adicionar verificação de unique company, cnpj se pa
    const company = await this.prismaService.company.create({
      data: { companyName, location },
    });
    return { company };
  }

  async findAll() {
    const companies = await this.prismaService.company.findMany();
    return { companies };
  }

  async findOne(id: number) {
    //Verifica se o usuário existe, e o retorna caso sim.
    const company = await this.prismaService.company.findUnique({
      where: { id },
    });
    if (!company) throw new NotFoundError('Company not Found');

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
