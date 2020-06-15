import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { Company } from './entity/company.entity';
import { NewCompanyDto } from './dto/new-company.dto';
import { UpdateCompany } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  private logger = new Logger('CompanyService');
  constructor(private companyRepository: CompanyRepository) {}

  // add new company
  async newCompany(newCompanyDto: NewCompanyDto): Promise<Company> {
    return this.companyRepository.newCompany(newCompanyDto);
  }

  // get companies
  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.getCompanies();
  }

  // get single company
  async getCompany(id: string): Promise<Company> {
    return this.companyRepository.getCompany(id);
  }

  // update company
  async updateCompany(
    id: string,
    updateCompany: UpdateCompany,
  ): Promise<Company> {
    const company = await this.getCompany(id);

    try {
      const update = Object.assign(company, updateCompany);
      const updatedCompany = await this.companyRepository.newCompany(update);

      this.logger.verbose(`Company "${company.name}" updated`);
      return updatedCompany;
    } catch (err) {
      this.logger.error('Failed to update company');
      throw new ConflictException(err.message);
    }
  }
}
