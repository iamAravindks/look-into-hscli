import mongoose, { Types } from "mongoose";

export const rawUserData = [
  {
    _id: new Types.ObjectId("651ba3b2f1618f9f1ab40f15"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "tym58mPo7k",
    name: "VLvcZEVjhE",
    password: "tYmezYS2OW",
    bio: "4Fr8KWVvDp",
    status: "OHRjVKSEH8",
    imageUrl: "3343YPO5RA",
    followers: [new Types.ObjectId("651ba3b2f1618f9f1ab40f16")],
    following: [new Types.ObjectId("651ba3b2f1618f9f1ab40f17")],
    passwordResetToken: "O8ifGGkhf1",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("651ba3b2f1618f9f1ab40f18"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "w6B9Y9PdXb",
    name: "ExrQnRwdBh",
    password: "zJ7D5GlxHm",
    bio: "itPbcwlAqk",
    status: "STOhC449mf",
    imageUrl: "bcp7p4NdBz",
    followers: [new Types.ObjectId("651ba3b2f1618f9f1ab40f19")],
    following: [new Types.ObjectId("651ba3b2f1618f9f1ab40f1a")],
    passwordResetToken: "9hufYCAyfb",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("651ba3b2f1618f9f1ab40f1b"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "m8TVSsxBnQ",
    name: "xMaFPZVVVX",
    password: "0GwhVxw34O",
    bio: "ZnAoOZU0e5",
    status: "FLj97VA0kb",
    imageUrl: "pbMAaL6IY0",
    followers: [new Types.ObjectId("651ba3b2f1618f9f1ab40f1c")],
    following: [new Types.ObjectId("651ba3b2f1618f9f1ab40f1d")],
    passwordResetToken: "iuUiCloCKB",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("651ba3b2f1618f9f1ab40f1e"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "JIRNaIZeNZ",
    name: "PLHtvET6G2",
    password: "GP7CpDVV1c",
    bio: "kpTcfWh4bv",
    status: "NayFt5vLyU",
    imageUrl: "QWXqERoJMO",
    followers: [new Types.ObjectId("651ba3b2f1618f9f1ab40f1f")],
    following: [new Types.ObjectId("651ba3b2f1618f9f1ab40f20")],
    passwordResetToken: "WV6epq00t4",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("651ba3b2f1618f9f1ab40f21"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "wayzAgiJ9R",
    name: "KmAW7W73J9",
    password: "bcwbHq4vRx",
    bio: "Rd8MTcGaeN",
    status: "qCVWtqBzKA",
    imageUrl: "d8zemYlYef",
    followers: [new Types.ObjectId("651ba3b2f1618f9f1ab40f22")],
    following: [new Types.ObjectId("651ba3b2f1618f9f1ab40f23")],
    passwordResetToken: "negRitLx7B",
    passwordTokenExpires: new Date(),
  },
];

export const seedUser = async () => {
  const { collections } = mongoose.connection;
  const userCollection = collections["users"];
  console.log(
    "Inserted Doc Ids: ",
    await userCollection.insertMany(rawUserData)
  );
};
