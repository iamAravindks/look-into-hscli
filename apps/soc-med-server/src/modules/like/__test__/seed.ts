import mongoose, { Types } from "mongoose";

export const rawLikeData = [
  {
    _id: new Types.ObjectId("651fd18870d417445a3582af"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("651fd18870d417445a3582b0"),
    postId: new Types.ObjectId("651fd18870d417445a3582b1"),
  },
  {
    _id: new Types.ObjectId("651fd18870d417445a3582b2"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("651fd18870d417445a3582b3"),
    postId: new Types.ObjectId("651fd18870d417445a3582b4"),
  },
  {
    _id: new Types.ObjectId("651fd18870d417445a3582b5"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("651fd18870d417445a3582b6"),
    postId: new Types.ObjectId("651fd18870d417445a3582b7"),
  },
  {
    _id: new Types.ObjectId("651fd18870d417445a3582b8"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("651fd18870d417445a3582b9"),
    postId: new Types.ObjectId("651fd18870d417445a3582ba"),
  },
  {
    _id: new Types.ObjectId("651fd18870d417445a3582bb"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("651fd18870d417445a3582bc"),
    postId: new Types.ObjectId("651fd18870d417445a3582bd"),
  },
];

export const seedLike = async () => {
  const { collections } = mongoose.connection;
  const likeCollection = collections["likes"];
  console.log(
    "Inserted Doc Ids: ",
    await likeCollection.insertMany(rawLikeData)
  );
};
