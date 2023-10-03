import { Resolvers } from "../../libs/types";

export default {
  Query: {
    socMedServerHello: (parent, args, context, info) =>
      context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
