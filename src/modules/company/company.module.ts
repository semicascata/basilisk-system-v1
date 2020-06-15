import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
