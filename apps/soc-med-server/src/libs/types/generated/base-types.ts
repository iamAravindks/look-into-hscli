import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IUserDocument } from '../../../modules/user/user.model';
import { IPostDocument } from '../../../modules/post/post.model';
import { SocMedServerContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  JSON: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type AuthData = {
  __typename?: 'AuthData';
  refreshToken?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  token: FieldWrapper<Scalars['String']['output']>;
  userId: FieldWrapper<Scalars['String']['output']>;
};

export type CachePurgeInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  types: Array<Scalars['String']['input']>;
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: FieldWrapper<Post>;
  createUser: FieldWrapper<User>;
  deleteManyPost: Array<FieldWrapper<Post>>;
  deletePost: FieldWrapper<Post>;
  deleteUser: FieldWrapper<User>;
  resetPassword: FieldWrapper<User>;
  updatePost: FieldWrapper<Post>;
  updateUser: FieldWrapper<User>;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteManyPostArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeletePostArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  resetToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Post = {
  __typename?: 'Post';
  _id: FieldWrapper<Scalars['ID']['output']>;
  content?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  creator?: Maybe<FieldWrapper<Scalars['ID']['output']>>;
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  forgotPassword: FieldWrapper<Scalars['String']['output']>;
  getAllPost: Array<Maybe<FieldWrapper<Post>>>;
  getAllPostCount: FieldWrapper<Scalars['Int']['output']>;
  getAllUser: Array<Maybe<FieldWrapper<User>>>;
  getAllUserCount: FieldWrapper<Scalars['Int']['output']>;
  getOnePost?: Maybe<FieldWrapper<Post>>;
  getOneUser?: Maybe<FieldWrapper<User>>;
  getPostById?: Maybe<FieldWrapper<Post>>;
  getProfile?: Maybe<FieldWrapper<User>>;
  getUserById?: Maybe<FieldWrapper<User>>;
  login: FieldWrapper<AuthData>;
  socMedServerHello: FieldWrapper<Scalars['String']['output']>;
};


export type QueryForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetAllPostArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllPostCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllUserArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllUserCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOnePostArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetOneUserArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetPostByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetProfileArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetUserByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdatePostInput = {
  _id: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: FieldWrapper<Scalars['ID']['output']>;
  bio?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  email?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  followers?: Maybe<Array<Maybe<FieldWrapper<Scalars['ID']['output']>>>>;
  following?: Maybe<Array<Maybe<FieldWrapper<Scalars['ID']['output']>>>>;
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  password?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  passwordResetToken?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  passwordTokenExpires?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  status?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type UnwrappedObject<T> = {
        [P in keyof T]: T[P] extends infer R | Promise<infer R> | (() => infer R2 | Promise<infer R2>)
          ? R & R2 : T[P]
      };
export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthData: ResolverTypeWrapper<AuthData>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CachePurgeInput: CachePurgeInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Post: ResolverTypeWrapper<IPostDocument>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<IUserDocument>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthData: AuthData;
  String: Scalars['String']['output'];
  CachePurgeInput: CachePurgeInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  ID: Scalars['ID']['output'];
  Post: IPostDocument;
  Query: {};
  Int: Scalars['Int']['output'];
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  User: IUserDocument;
  Boolean: Scalars['Boolean']['output'];
}>;

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = SocMedServerContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CachePurgeDirectiveArgs = {
  payloads: Array<CachePurgeInput>;
};

export type CachePurgeDirectiveResolver<Result, Parent, ContextType = SocMedServerContext, Args = CachePurgeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheSetDirectiveArgs = {
  identifier: Scalars['String']['input'];
  maxAge?: Maybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type CacheSetDirectiveResolver<Result, Parent, ContextType = SocMedServerContext, Args = CacheSetDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsMhAdminDirectiveArgs = { };

export type IsMhAdminDirectiveResolver<Result, Parent, ContextType = SocMedServerContext, Args = IsMhAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthDataResolvers<ContextType = SocMedServerContext, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = ResolversObject<{
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = SocMedServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deleteManyPost?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationDeleteManyPostArgs, 'filter'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, '_id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, '_id'>>;
  resetPassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationResetPasswordArgs>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
}>;

export type PostResolvers<ContextType = SocMedServerContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Post']>, { __typename: 'Post' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = SocMedServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  forgotPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryForgotPasswordArgs, 'email'>>;
  getAllPost?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType, Partial<QueryGetAllPostArgs>>;
  getAllPostCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllPostCountArgs>>;
  getAllUser?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryGetAllUserArgs>>;
  getAllUserCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllUserCountArgs>>;
  getOnePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, Partial<QueryGetOnePostArgs>>;
  getOneUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetOneUserArgs>>;
  getPostById?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostByIdArgs, '_id'>>;
  getProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetProfileArgs>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, '_id'>>;
  login?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  socMedServerHello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = SocMedServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']>, { __typename: 'User' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordResetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordTokenExpires?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = SocMedServerContext> = ResolversObject<{
  AuthData?: AuthDataResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = SocMedServerContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  cachePurge?: CachePurgeDirectiveResolver<any, any, ContextType>;
  cacheSet?: CacheSetDirectiveResolver<any, any, ContextType>;
  isMHAdmin?: IsMhAdminDirectiveResolver<any, any, ContextType>;
}>;
