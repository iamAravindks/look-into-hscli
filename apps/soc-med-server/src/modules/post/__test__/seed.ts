import mongoose, { Types } from "mongoose";

export const rawPostData = [
  {
    _id: new Types.ObjectId("651bf6298580a7e2c7d25643"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "KEc7g5iebq",
    content: "WRpbA43e2C",
    imageUrl: "s8UbnLbOGz",
    creator: new Types.ObjectId("651bf6298580a7e2c7d25644"),
  },
  {
    _id: new Types.ObjectId("651bf6298580a7e2c7d25645"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "NXtbUji1Lg",
    content: "KnzdwTUZtF",
    imageUrl: "cMX1RKdySV",
    creator: new Types.ObjectId("651bf6298580a7e2c7d25646"),
  },
  {
    _id: new Types.ObjectId("651bf6298580a7e2c7d25647"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "ZJFCLYVo18",
    content: "JdnV3AxgeL",
    imageUrl: "vedWyiHrHd",
    creator: new Types.ObjectId("651bf6298580a7e2c7d25648"),
  },
  {
    _id: new Types.ObjectId("651bf6298580a7e2c7d25649"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "jBHRdET1Ur",
    content: "vnj6is7lvF",
    imageUrl: "C4aQpHGrDM",
    creator: new Types.ObjectId("651bf6298580a7e2c7d2564a"),
  },
  {
    _id: new Types.ObjectId("651bf6298580a7e2c7d2564b"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "lt8OAWE32W",
    content: "WasgfMHTcs",
    imageUrl: "nboGQeE1em",
    creator: new Types.ObjectId("651bf6298580a7e2c7d2564c"),
  },
];

export const seedPost = async () => {
  const { collections } = mongoose.connection;
  const postCollection = collections["posts"];
  console.log(
    "Inserted Doc Ids: ",
    await postCollection.insertMany(rawPostData)
  );
};
