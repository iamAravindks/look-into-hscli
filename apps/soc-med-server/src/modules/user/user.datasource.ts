/* eslint-disable prettier/prettier */
import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, omit, set, size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreateUserInput,
  QueryGetAllUserArgs,
  QueryGetAllUserCountArgs,
  QueryGetOneUserArgs,
  QueryGetProfileArgs,
  SocMedServerContext,
  UpdateUserInput,
} from "../../libs/types";
import { GQLError } from "../../utils/GQLError";
import { UserModel } from "./user.model";

export default class UserDataSource {
  private readonly model = UserModel;
  private readonly USERS_SEARCH_INDEX_NAME = "users_search";
  private readonly USERS_AUTO_COMPLETE_INDEX = "users_autocomplete";

  async getAllUser(args: QueryGetAllUserArgs) {
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

  async getAllUserCount(args: QueryGetAllUserCountArgs) {
    const pipelines: PipelineStage[] = [];

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: this.USERS_SEARCH_INDEX_NAME,
          regex: {
            path: ["name"],
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

  async getUserById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneUser(args: QueryGetOneUserArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async getProfile(args: QueryGetProfileArgs, context: SocMedServerContext) {
    return this.model.findById(context.userId).lean();
  }

  async createUser(data: CreateUserInput) {
    const user = new this.model({ ...data });
    return user.save();
  }

  async updateUser(data: UpdateUserInput, context: SocMedServerContext) {
    const user = await this.model.findById(context.userId);
    if (!user) throw new GQLError("user not found", "NOT_FOUND", 404);

    for (const field in omit(data, "_id")) set(user, field, get(data, field));

    return user.save();
  }

  async deleteUser(_id: string) {
    const user = await this.model.findById(_id);
    if (!user) throw new GraphQLError("user not found");

    await this.model.deleteOne({ _id });
    return user;
  }
}
