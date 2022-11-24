import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'lead ' })
export class Lead {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
