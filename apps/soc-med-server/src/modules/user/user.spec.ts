import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createUserOperation,
  createManyUserOperation,
  deleteUserOperation,
  deleteManyUserOperation,
  getAllUserCountOperation,
  getAllUserOperation,
  getUserByIdOperation,
  getOneUserOperation,
  updateUserOperation,
  updateManyUserOperation,
} from "./__test__/operations";
import { rawUserData, seedUser } from "./__test__/seed";

describe("User Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedUser();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST USER BY ID", async () => {
    await getUserByIdOperation(String(rawUserData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST USERS", async () => {
    await getAllUserOperation(String(rawUserData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE USER", async () => {
    await getOneUserOperation(String(rawUserData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT USERS", async () => {
    await getAllUserCountOperation(server);
  });

  it("Positive - MUTATION: CREATE USER", async () => {
    await createUserOperation(
      {
        email: "cfHYhGAN1p",
        name: "oAmAdY9VdD",
        password: "9jliSCy2pn",
        bio: "lI0CCzWFEL",
        status: "KiX5vhKNPN",
        imageUrl: "354IG3Ow6I",
        followers: ["651ba3b2f1618f9f1ab40f09"],
        following: ["651ba3b2f1618f9f1ab40f0a"],
        passwordResetToken: "nP52yVSoAN",
        passwordTokenExpires: new Date(),
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY USERS", async () => {
    const newUsers = await createManyUserOperation(
      [
        {
          email: "5Rhyk8aTCl",
          name: "slcZgOMqeF",
          password: "1AG80IYxc2",
          bio: "oQnaHmXwBq",
          status: "RkfKyDkGLa",
          imageUrl: "BMXTdbGMGz",
          followers: ["651ba3b2f1618f9f1ab40f0b"],
          following: ["651ba3b2f1618f9f1ab40f0c"],
          passwordResetToken: "Mg4pORU6kp",
          passwordTokenExpires: new Date(),
        },
        {
          email: "TB41nUUPCN",
          name: "Hxgdgm8t4k",
          password: "c8Gb7KBnUf",
          bio: "2I7G47N7t7",
          status: "zJkHViDrZg",
          imageUrl: "lkKYXGhhU3",
          followers: ["651ba3b2f1618f9f1ab40f0d"],
          following: ["651ba3b2f1618f9f1ab40f0e"],
          passwordResetToken: "XbU6mUKVnS",
          passwordTokenExpires: new Date(),
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE USER ", async () => {
    await updateUserOperation(
      {
        _id: updateUserIdOne,
        email: "wHKVN6liYu",
        name: "Imcx3mg7W9",
        password: "L1LCxVU5S5",
        bio: "pko0DGZByD",
        status: "90nWmyrAQT",
        imageUrl: "aymsSJtgsg",
        followers: ["651ba3b2f1618f9f1ab40f0f"],
        following: ["651ba3b2f1618f9f1ab40f10"],
        passwordResetToken: "tynbaMEcAs",
        passwordTokenExpires: new Date(),
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY USERS", async () => {
    await updateManyUserOperation(
      [
        {
          _id: updateUserIdOne,
          email: "tvzYANMuux",
          name: "tD7MO6XO64",
          password: "u7XoWWUhmb",
          bio: "kbcdIzpBzV",
          status: "NucqciuLlf",
          imageUrl: "fQBK08Mm6t",
          followers: ["651ba3b2f1618f9f1ab40f11"],
          following: ["651ba3b2f1618f9f1ab40f12"],
          passwordResetToken: "xLX8w56EJb",
          passwordTokenExpires: new Date(),
        },
        {
          _id: updateUserIdTwo,
          email: "Lx7rg5S9Vj",
          name: "vCdV80lZA5",
          password: "n0vRO3amgF",
          bio: "CjDoBCChs4",
          status: "9HoKnr9fH8",
          imageUrl: "LpqOv7YzQv",
          followers: ["651ba3b2f1618f9f1ab40f13"],
          following: ["651ba3b2f1618f9f1ab40f14"],
          passwordResetToken: "L0pWu9AWb1",
          passwordTokenExpires: new Date(),
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE USER", async () => {
    await deleteUserOperation(String(rawUserData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE USER BY FILTER", async () => {
    await deleteManyUserOperation(String(rawUserData[4]._id.valueOf()), server);
  });
});
