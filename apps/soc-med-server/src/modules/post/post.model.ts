import { Document, Model, Schema, model, Types } from "mongoose";

type IPost = {
  title: string;
  content: string;
  imageUrl: string;
  creator: Types.ObjectId;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IPostDocument extends IPost, Document {}

export interface IPostModel extends Model<IPostDocument> {}

const PostSchema = new Schema<IPostDocument, IPostModel>(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    content: {
      type: String,
      required: true,
      unique: false,
    },
    imageUrl: {
      type: String,
      required: false,
      unique: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<IPostDocument, IPostModel>("posts", PostSchema);
