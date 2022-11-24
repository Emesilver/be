import { Injectable } from '@nestjs/common';
import { NewLeadInput } from './dtos/new-lead.input';
import { Lead } from './models/lead.model';

@Injectable()
export class LeadService {
  private leads: Lead[];
  constructor() {
    this.leads = [];
  }

  async create(newLeadInput: NewLeadInput): Promise<Lead> {
    this.leads.push({
      id: `${this.leads.length}`,
      email: newLeadInput.email,
      phone_number: newLeadInput.phone_number ?? 'empty phone',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return this.leads[this.leads.length - 1];
  }

  async findById(id: string): Promise<Lead | undefined> {
    return this.leads.find((e) => e.id === id);
  }
}
