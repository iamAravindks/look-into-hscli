/* eslint-disable prettier/prettier */
import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreateLikeInput,
  QueryGetAllLikeArgs,
  QueryGetAllLikeCountArgs,
  QueryGetOneLikeArgs,
} from "../../libs/types";
import { GQLError } from "../../utils/GQLError";
import { PostModel } from "../post/post.model";
import { LikeModel } from "./like.model";

export default class LikeDataSource {
  private readonly model = LikeModel;

  async getAllLike(args: QueryGetAllLikeArgs) {
    const pipelines: PipelineStage[] = [];
    const limit = Number(args.limit) || 10;
    const offset = Number(args.offset) || 0;

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    size(args.search?.trim()) <= 2 &&
      pipelines.push({ $sort: args.sort || { createdAt: -1 } });
    pipelines.push({ $skip: offset });
    pipelines.push({ $limit: limit });

    return this.model.aggregate(pipelines);
  }

  async getAllLikeCount(args: QueryGetAllLikeCountArgs) {
    const pipelines: PipelineStage[] = [];

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    pipelines.push({ $count: "totalCount" });

    return (await this.model.aggregate(pipelines))[0]?.totalCount || 0;
  }

  async getLikeById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneLike(args: QueryGetOneLikeArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createLike(data: CreateLikeInput) {
    const postExists = await PostModel.exists({ _id: data.postId });
    if (!postExists) throw new GQLError("Post not found", "NOT_FOUND", 404);
    const LikedPost = await this.model.findOne({ ...data }).lean();
    if (LikedPost) return LikedPost;
    const like = new this.model({ ...data });
    return like.save();
  }

  async deleteLike(data: CreateLikeInput) {
    const postExists = await PostModel.exists({ _id: data.postId });
    if (!postExists) throw new GQLError("Post not found", "NOT_FOUND", 404);
    const like = await this.model.findOne({ ...data });
    if (!like) throw new GraphQLError("like not found");

    await this.model.deleteOne({ ...data });
    return like;
  }
}
