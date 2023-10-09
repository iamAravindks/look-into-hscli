/* eslint-disable prettier/prettier */
import { CreateLikeInput, Resolvers } from "../../libs/types";

export default {
  Query: {
    getLikeById: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getLikeById(String(args._id)),
    getAllLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getAllLike(args),
    getOneLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getOneLike(args),
    getAllLikeCount: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getAllLikeCount(args),
  },
  Mutation: {
    createLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.createLike({
        userId: context.userId,
        postId: args.postId,
      } as CreateLikeInput),
    deleteLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.deleteLike({
        userId: context.userId,
        postId: args.postId,
      } as CreateLikeInput),
  },
  Like: {
    __resolveReference: async (ref, context, info) =>
      ref._id ? context.loaders.likeByIdLoader.load(ref._id) : null,
    user: (parent, args, context, info) => {
      return context.loaders.userByIdLoader.load(parent.userId.toString());
    },
    post: (parent, args, context, info) => {
      return context.loaders.postByIdLoader.load(parent.postId.toString());
    },
  },
} as Resolvers;
