import { Test, TestingModule } from '@nestjs/testing';
import { ClocksysService } from './clocksys.service';

describe('ClocksysService', () => {
  let service: ClocksysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClocksysService],
    }).compile();

    service = module.get<ClocksysService>(ClocksysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
