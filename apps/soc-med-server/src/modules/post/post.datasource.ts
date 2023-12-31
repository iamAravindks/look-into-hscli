/* eslint-disable prettier/prettier */
import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, isEmpty, map, omit, set, size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreatePostInput,
  MutationDeleteManyPostArgs,
  QueryGetAllPostArgs,
  QueryGetAllPostCountArgs,
  QueryGetOnePostArgs,
  SocMedServerContext,
  UpdatePostInput,
} from "../../libs/types";
import { convertDateStringsToDates } from "../../utils/Helper";
import { PostModel } from "./post.model";

export default class PostDataSource {
  private readonly model = PostModel;
  private readonly POST_SEARCH = "post_search";

  async getAllPost(args: QueryGetAllPostArgs) {
    const pipelines: PipelineStage[] = [];
    const limit = Number(args.limit) || 10;
    const offset = Number(args.offset) || 0;

    convertDateStringsToDates(args.filter);

    console.log(args.filter);

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: this.POST_SEARCH,
          regex: {
            path: ["title"],
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

  async getAllPostCount(args: QueryGetAllPostCountArgs) {
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

  async getPostById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOnePost(args: QueryGetOnePostArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createPost(data: CreatePostInput, context: SocMedServerContext) {
    const creator = context.userId;
    const post = new this.model({ ...data, creator });
    return post.save();
  }

  async updatePost(data: UpdatePostInput) {
    const post = await this.model.findById(data._id);
    if (!post) throw new GraphQLError("post not found");

    for (const field in omit(data, "_id")) set(post, field, get(data, field));

    return post.save();
  }

  async updateManyPost(datas: UpdatePostInput[]) {
    const posts = datas.map((input: UpdatePostInput) => this.updatePost(input));
    return posts;
  }

  async deletePost(_id: string) {
    const post = await this.model.findById(_id);
    if (!post) throw new GraphQLError("post not found");

    await this.model.deleteOne({ _id });
    return post;
  }

  async deleteManyPost(args: MutationDeleteManyPostArgs) {
    const posts = await this.model.find(args.filter);
    if (isEmpty(posts)) throw new GraphQLError("posts not found");

    await this.model.deleteMany({ _id: { $in: map(posts, "_id") } });
    return posts;
  }
}
