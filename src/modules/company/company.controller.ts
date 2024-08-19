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
import { CompanyService } from './company.service';
import { CompanyBodyDTO } from './dto/company-body-dto';
import { Created, Ok } from 'src/shared/responses/success.types';
import { Public } from 'src/shared/decorators/public.decorator';

//company controller
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

//create a new company
  @Public()
  @Post()
  async create(@Body() createCompanyDto: CompanyBodyDTO) {
    const company = await this.companyService.create(createCompanyDto);
    return new Created(company)
  }

//get all companies
  @Get()
  async findAll(@Query() query: any) {
    const company = await this.companyService.findAll();
    return new Ok(company)
  }

//get company by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const company = await this.companyService.findOne(Number(id));
    return new Ok(company)
  }

//Update company
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: Partial<CompanyBodyDTO>) {
    const company = await this.companyService.update(Number(id), body);
    return new Ok(company)
  }

//delete company
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const company = await this.companyService.remove(Number(id));
    return new Ok(company)
  }
}