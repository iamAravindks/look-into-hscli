import { get } from "lodash";
import {
  ContextValueType,
  MockContextValue,
} from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import { CreateLikeInput, UpdateLikeInput } from "../../../libs/types";
import {
  createLike,
  createManyLike,
  deleteLike,
  deleteManyLike,
  getAllLike,
  getAllLikeCount,
  getOneLike,
  getLikeById,
  updateLike,
  updateManyLike,
} from "./queries";

export const getLikeByIdOperation = async (
  likeId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(getLikeById(likeId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.getLikeById");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(likeId);
};

export const getAllLikeOperation = async (
  likeId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    getAllLike("", { _id: { $eq: likeId } }, { createdAt: 1 }, 10, 0),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.getAllLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(likeId);
};

export const getOneLikeOperation = async (
  likeId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    getOneLike({ _id: { $eq: likeId } }, { createdAt: 1 }),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.getOneLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(likeId);
};

export const getAllLikeCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllLikeCount("", {}), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllLikeCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createLikeOperation = async (
  data: CreateLikeInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(createLike(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.createLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const createManyLikeOperation = async (
  datas: CreateLikeInput[],
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(createManyLike(datas), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult: any = get(
    result,
    "body.singleResult.data.createManyLike"
  );
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([expect.objectContaining(datas[0])])
  );
  return refinedResult;
};

export const updateLikeOperation = async (
  data: UpdateLikeInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(updateLike(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.updateLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateManyLikeOperation = async (
  datas: UpdateLikeInput[],
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(updateManyLike(datas), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.updateManyLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([expect.objectContaining(datas[0])])
  );
};

export const deleteLikeOperation = async (
  likeId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(deleteLike(likeId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(likeId);
};

export const deleteManyLikeOperation = async (
  likeId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    deleteManyLike({ _id: { $eq: likeId } }),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.deleteManyLike");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(likeId);
};
