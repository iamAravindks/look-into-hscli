/* eslint-disable prettier/prettier */
import {
  MutationResetPasswordArgs,
  QueryForgotPasswordArgs,
  QueryLoginArgs,
  Resolvers,
  SocMedServerContext,
} from "../../libs/types";

export default {
  Query: {
    login: async (
      _: any,
      args: QueryLoginArgs,
      context: SocMedServerContext
    ) => {
      return context.dataSources.authDataSource.login(args, context);
    },
    forgotPassword: async (
      _: any,
      args: QueryForgotPasswordArgs,
      context: SocMedServerContext
    ) => {
      const res = context.dataSources.authDataSource.forgotPassword(
        args,
        context
      );
      if (res) {
        return res;
      }
    },
  },

  Mutation: {
    resetPassword: async (
      _: unknown,
      args: MutationResetPasswordArgs,
      context: SocMedServerContext
    ) => {
      const user = await context.dataSources.authDataSource.resetPassword(
        args,
        context
      );
      return user?.toJSON();
    },
  },
} as Resolvers;
