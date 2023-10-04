/* eslint-disable prettier/prettier */
import crypto from "crypto";
import {
  MutationResetPasswordArgs,
  QueryForgotPasswordArgs,
  QueryLoginArgs,
  SocMedServerContext,
} from "../../libs/types";
import { GQLError, throwAnError } from "../../utils/GQLError";
import { getToken } from "../../utils/token";
import { loginValidation } from "../../utils/validation/validation";
import { UserModel } from "../user/user.model";

export default class AuthDataSource {
  private readonly model = UserModel;

  async login(args: QueryLoginArgs, context: SocMedServerContext) {
    try {
      const validLogin = loginValidation(args);
      if (validLogin.error) {
        throw new GQLError(
          `${validLogin.error.name}${validLogin.error.message}`,
          "INVALID_INPUT",
          422
        );
      }

      const user = await this.model.findOne({ email: args.email });

      if (!user) {
        throw new GQLError("No user found", "NOT_FOUND", 404);
      }
      if (!(await user.comparePassword(args.password))) {
        throw new GQLError("Invalid credentials", "INVALID_CREDENTIALS", 409);
      }
      const { email, _id } = user;

      const token = getToken({ email, userId: _id.toString() as string }, "1h");
      const refreshToken = getToken(
        { email, userId: _id.toString() as string },
        "3d"
      );

      context.accessToken = token;
      context.refreshToken = refreshToken;

      const userProfileKey = `profile:${user._id}`;
      const sanitizeUser = await user?.toJSON();
      // await context.redisClient.client.set(userProfileKey, JSON.stringify(sanitizeUser))

      return {
        token,
        userId: user._id.toString(),
        refreshToken,
      };
    } catch (error) {
      throwAnError(error);
    }
  }

  async forgotPassword(
    args: QueryForgotPasswordArgs,
    context: SocMedServerContext
  ) {
    try {
      const email = args.email;

      const user = await this.model.findOne({ email });

      if (!user) {
        throw new GQLError("No user found", "NOT_FOUND", 404);
      }
      const resetToken = user.createResetPasswordToken();
      await user.save();
      return resetToken;
    } catch (error) {
      throwAnError(error);
    }
  }

  async resetPassword(
    args: MutationResetPasswordArgs,
    context: SocMedServerContext
  ) {
    try {
      const { resetToken, password } = args;
      const hashToken = crypto
        .createHash("sha256")
        .update(resetToken as string)
        .digest("hex");

      const user = await this.model.findOne({
        passwordResetToken: hashToken,
        passwordTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new GQLError("INVALID TOKEN", "INVALID_REQUEST", 400);
      }
      user.password = password as string;
      user.passwordResetToken = undefined;
      user.passwordTokenExpires = undefined;

      await user.save();
      return user;
    } catch (error) {
      throwAnError(error);
    }
  }
}
