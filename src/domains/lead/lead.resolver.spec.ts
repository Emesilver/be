import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NewLeadInput } from './dtos/new-lead.input';
import { LeadResolver } from './lead.resolver';
import { LeadService } from './lead.service';
import { Lead } from './models/lead.model';

describe('LeadResolver', () => {
  let resolver: LeadResolver;
  let leadService: LeadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadResolver,
        {
          provide: LeadService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn()
          }
        }
      ]
    }).compile();

    resolver = module.get<LeadResolver>(LeadResolver);
    leadService = module.get<LeadService>(LeadService);
  });

  describe('addLead', () => {
    it('should call create service method', async () => {
      const newLeadInput: NewLeadInput = {
        email: 'test',
        phone_number: ''
      };
      const expectedResult: Lead = {
        id: '0',
        email: newLeadInput.email,
        phone_number: newLeadInput.email,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(leadService, 'create').mockResolvedValue(expectedResult);

      const result = await resolver.addLead(newLeadInput);

      expect(leadService.create).toBeCalledTimes(1);
      expect(leadService.create).toHaveBeenCalledWith(newLeadInput);
      expect(result).toBe(expectedResult);
    });
  });

  describe('lead', () => {
    it('should call findById service method', async () => {
      const filterId = '0';
      const expectedResult: Lead = {
        id: '0',
        email: '',
        phone_number: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(leadService, 'findById').mockResolvedValue(expectedResult);

      const result = await resolver.lead(filterId);

      expect(leadService.findById).toBeCalledTimes(1);
      expect(leadService.findById).toHaveBeenCalledWith(filterId);
      expect(result).toBe(expectedResult);
    });

    it('should throw error on not found', async () => {
      const filterId = '';
      jest.spyOn(leadService, 'findById').mockResolvedValue(undefined);

      await expect(resolver.lead(filterId)).rejects.toEqual(
        new NotFoundException(filterId)
      );
    });
  });
});
