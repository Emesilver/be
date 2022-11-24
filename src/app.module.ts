import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { LeadModule } from './domains/lead/lead.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    LeadModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: true // 'schema.gql', // true -> in memory
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      // installSubscriptionHandlers: true,
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION]
      //     })
      //   ]
      // }
    })
  ]
})
export class AppModule {}
