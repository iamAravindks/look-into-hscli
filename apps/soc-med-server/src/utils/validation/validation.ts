/* eslint-disable prettier/prettier */

import { MutationCreateUserArgs, QueryLoginArgs } from "../../libs/types";
import { loginSchema, userCreateSchema, userUpdateSchema } from "./joi.schema";

export const loginValidation = (login: QueryLoginArgs) => {
  return loginSchema.validate(login);
};

export const userCreationValidation = (user: MutationCreateUserArgs) => {
  return userCreateSchema.validate(user);
};

export const userUpdateValidation = (args: {
  email?: string;
  name?: string;
  password?: string;
}) => {
  return userUpdateSchema.validate(args);
};
