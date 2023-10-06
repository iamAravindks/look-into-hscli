/* eslint-disable prettier/prettier */
import { Document, Model, Schema, Types, model } from "mongoose";

type ILike = {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface ILikeDocument extends ILike, Document {}

export interface ILikeModel extends Model<ILikeDocument> {}

const LikeSchema = new Schema<ILikeDocument, ILikeModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LikeModel = model<ILikeDocument, ILikeModel>("likes", LikeSchema);
