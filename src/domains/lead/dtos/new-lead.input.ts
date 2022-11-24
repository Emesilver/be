import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewLeadInput {
  @Field()
  @MaxLength(100)
  email: string;

  @Field()
  @MaxLength(50)
  phone_number: string;
}
