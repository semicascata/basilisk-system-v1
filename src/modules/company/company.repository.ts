import { EntityRepository, Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import {
  Logger,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewCompanyDto } from './dto/new-company.dto';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  private logger = new Logger('CompanyRepository');

  // register new company
  async newCompany(newCompanyDto: NewCompanyDto): Promise<Company> {
    const { name, city, state, cep, email, contact1, contact2 } = newCompanyDto;
    const newCompany = new Company();

    newCompany.name = name;
    newCompany.city = city;
    newCompany.state = state;
    newCompany.cep = cep;
    newCompany.email = email;
    newCompany.contact1 = contact1;

    // check contact 2
    contact2
      ? (newCompany.contact2 = 'none')
      : (newCompany.contact2 = contact2);

    try {
      await this.save(newCompany);
      this.logger.verbose(`New company "${name}" registered`);
      return newCompany;
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error('Company already registered');
        throw new ConflictException('Company already registered');
      } else {
        this.logger.error('Failed to register new company');
        throw new InternalServerErrorException(
          'Failed to register new company',
        );
      }
    }
  }

  // get all companies
  async getCompanies(): Promise<Company[]> {
    const companies = await this.createQueryBuilder('company').getMany();

    try {
      if (companies.length === 0) {
        throw new NotFoundException('No company found');
      }

      this.logger.verbose('Retrieving all companies');
      return companies;
    } catch (err) {
      this.logger.error('Error retrieving companies or database is empty');
      throw new NotFoundException(err.message);
    }
  }

  // get single company
  async getCompany(id: string): Promise<Company> {
    try {
      const company = await this.createQueryBuilder('company')
        .where('company.id = :id', { id: id })
        .getOne();

      this.logger.verbose(`Retrieving company "${company.name}"`);
      return company;
    } catch (err) {
      this.logger.error('Company not found');
      throw new NotFoundException();
    }
  }
}
