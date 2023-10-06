/* eslint-disable prettier/prettier */
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../modules/user/user.model";
import { GQLError } from "./GQLError";

export const getUserFromToken = async (token: string) => {
  try {
    if (!token) {
      throw new GQLError("No Token found", "INVALID_TOKEN", 400);
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      throw new GQLError("No user found", "INVALID_TOKEN", 400);
    }

    return user._id;
  } catch (error) {
    throw new GQLError("verification failed", "VERIFICATION_FAILED", 400);
  }
};

export function convertDateStringsToDates(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      convertDateStringsToDates(obj[key]);
    } else if (typeof obj[key] === "string") {
      obj[key] = new Date(obj[key]);
    }
  }

  return obj;
}
