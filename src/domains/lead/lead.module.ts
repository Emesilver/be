import { Module } from '@nestjs/common';
import { LeadResolver } from './lead.resolver';
import { LeadService } from './lead.service';

@Module({
  providers: [LeadResolver, LeadService]
})
export class LeadModule {}
