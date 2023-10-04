import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createPostOperation,
  createManyPostOperation,
  deletePostOperation,
  deleteManyPostOperation,
  getAllPostCountOperation,
  getAllPostOperation,
  getPostByIdOperation,
  getOnePostOperation,
  updatePostOperation,
  updateManyPostOperation,
} from "./__test__/operations";
import { rawPostData, seedPost } from "./__test__/seed";

describe("Post Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedPost();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST POST BY ID", async () => {
    await getPostByIdOperation(String(rawPostData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST POSTS", async () => {
    await getAllPostOperation(String(rawPostData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE POST", async () => {
    await getOnePostOperation(String(rawPostData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT POSTS", async () => {
    await getAllPostCountOperation(server);
  });

  it("Positive - MUTATION: CREATE POST", async () => {
    await createPostOperation(
      {
        title: "XssGTM2ucg",
        content: "0fsG8xfWKj",
        imageUrl: "UBOFnLHxBx",
        creator: "651bf6298580a7e2c7d2563d",
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY POSTS", async () => {
    const newUsers = await createManyPostOperation(
      [
        {
          title: "kVeYLJFFT6",
          content: "VYGkq1N5u4",
          imageUrl: "hDXLy1p0JF",
          creator: "651bf6298580a7e2c7d2563e",
        },
        {
          title: "zXzTFS1qBU",
          content: "JhZm66DlUg",
          imageUrl: "QeqQWoX93j",
          creator: "651bf6298580a7e2c7d2563f",
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE POST ", async () => {
    await updatePostOperation(
      {
        _id: updateUserIdOne,
        title: "fj9gQnuXEu",
        content: "jXBi85QGfl",
        imageUrl: "IAEDSVvxhB",
        creator: "651bf6298580a7e2c7d25640",
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY POSTS", async () => {
    await updateManyPostOperation(
      [
        {
          _id: updateUserIdOne,
          title: "pjM9RFgZIH",
          content: "Fdei5Lxx55",
          imageUrl: "PclRO1ia7a",
          creator: "651bf6298580a7e2c7d25641",
        },
        {
          _id: updateUserIdTwo,
          title: "ClibZ6uMCz",
          content: "2swxrn6BAf",
          imageUrl: "jpjm8I7UNX",
          creator: "651bf6298580a7e2c7d25642",
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE POST", async () => {
    await deletePostOperation(String(rawPostData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE POST BY FILTER", async () => {
    await deleteManyPostOperation(String(rawPostData[4]._id.valueOf()), server);
  });
});
