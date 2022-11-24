import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewLeadInput } from './dtos/new-lead.input';
import { LeadService } from './lead.service';
import { Lead } from './models/lead.model';

@Resolver(() => Lead)
export class LeadResolver {
  constructor(private leadService: LeadService) {}
  @Query(() => Lead)
  async lead(@Args('id') id: string): Promise<Lead> {
    const res = await this.leadService.findById(id);

    if (!res) {
      throw new NotFoundException(id);
    }
    return res;
  }

  @Mutation(() => Lead)
  async addLead(@Args('newLeadData') newLeadData: NewLeadInput): Promise<Lead> {
    return this.leadService.create(newLeadData);
  }
}
