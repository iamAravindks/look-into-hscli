/* eslint-disable prettier/prettier */

import DataLoader from "dataloader";
import { LikeByIdBatchFunc } from "../modules/like/like.loader";
import { PostByIdBatchFunc } from "../modules/post/post.loader";
import { UserByIdBatchFunc } from "../modules/user/user.loader";

export function getLoaders() {
  return {
    userByIdLoader: new DataLoader(UserByIdBatchFunc),
    postByIdLoader: new DataLoader(PostByIdBatchFunc),
    likeByIdLoader: new DataLoader(LikeByIdBatchFunc),
  };
}
