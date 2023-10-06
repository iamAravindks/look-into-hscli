import { CreateLikeInput, UpdateLikeInput } from "../../../libs/types";

export const getLikeById = (_id: string) => {
  return {
    query: ` 
      query getLikeById($_id: ID!) {
        getLikeById(_id: $_id) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllLike = (
  search: string,
  filter: any,
  sort: any,
  limit: number,
  offset: number
) => {
  return {
    query: `
      query getAllLike($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllLike(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      search: search,
      filter: filter,
      sort: sort,
      limit: limit,
      offset: offset,
    },
  };
};

export const getOneLike = (filter: any, sort: any) => {
  return {
    query: `
      query getOneLike($filter: JSON, $sort: JSON) {
        getOneLike(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllLikeCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllLikeCount($search: String, $filter: JSON) {
        getAllLikeCount(filter: $filter, search: $search) 
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createLike = (data: CreateLikeInput) => {
  return {
    query: `
      mutation createLike($data: CreateLikeInput!) {
        createLike(data: $data) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const createManyLike = (datas: CreateLikeInput[]) => {
  return {
    query: `
      mutation createManyLike($datas: [CreateLikeInput!]!) {
        createManyLike(datas: $datas) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const updateLike = (data: UpdateLikeInput) => {
  return {
    query: `
      mutation updateLike($data: UpdateLikeInput!) {
        updateLike(data: $data) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const updateManyLike = (datas: UpdateLikeInput[]) => {
  return {
    query: `
      mutation updateManyLike($datas: [UpdateLikeInput!]!) {
        updateManyLike(datas: $datas) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const deleteLike = (_id: string) => {
  return {
    query: `
      mutation deleteLike($_id: ID!) {
        deleteLike(_id: $_id) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};

export const deleteManyLike = (filter: any) => {
  return {
    query: `
      mutation deleteManyLike($filter: JSON!) {
        deleteManyLike(filter: $filter) {
          _id
          createdAt
          updatedAt
          userId
postId
        }
      }
  `,
    variables: {
      filter: filter,
    },
  };
};
