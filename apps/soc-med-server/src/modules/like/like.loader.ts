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
