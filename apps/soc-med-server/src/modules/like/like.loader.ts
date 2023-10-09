/* eslint-disable prettier/prettier */
import { ILikeDocument, LikeModel } from "./like.model";

export async function LikeByIdBatchFunc(ids: readonly string[]) {
  const likes = await LikeModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) =>
    likes.find((like: ILikeDocument) => String(like._id.valueOf()) === id)
  );
}

export async function LikeByPostIdBatchFunc(ids: readonly string[]) {
  const likes = await LikeModel.find({
    postId: {
      $in: ids,
    },
  });
  return ids.map((id: string) =>
    likes.filter(
      (like: ILikeDocument) => String(like.postId.toString()) === id.toString()
    )
  );
}
