import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import AuthDataSource from "../../modules/auth/auth.datasource";
import HelloDataSource from "../../modules/hello/hello.datasource";
import PostDataSource from "../../modules/post/post.datasource";
import UserDataSource from "../../modules/user/user.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

// eslint-disable-next-line prettier/prettier
export interface SocMedServerContext {
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  isMHAdmin: boolean;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
}

export type TDataSourceContext = {
  helloDataSource: HelloDataSource;
  userDataSource: UserDataSource;
  authDataSource: AuthDataSource;
  postDataSource: PostDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
