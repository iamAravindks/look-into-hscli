/* eslint-disable prettier/prettier */
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Document, Model, Schema, Types, model } from "mongoose";
import { getResetToken } from "../../utils/token";

type IUser = {
  email: string;
  name: string;
  password: string;
  bio: string;
  status: string;
  imageUrl: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  passwordResetToken?: string;
  passwordTokenExpires?: Date;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

// eslint-disable-next-line prettier/prettier
export interface IUserDocument extends IUser, Document {
  comparePassword(enteredPassword: string): Promise<boolean>;
  createResetPasswordToken(): string;
}
// eslint-disable-next-line prettier/prettier
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    bio: {
      type: String,
      required: false,
      unique: false,
    },
    status: {
      type: String,
      required: false,
      unique: false,
    },
    imageUrl: {
      type: String,
      required: false,
      unique: false,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    passwordResetToken: {
      type: String,
      required: false,
      unique: false,
    },
    passwordTokenExpires: {
      type: Date,
      required: false,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (error) {
    throw new Error("Error on saving password");
  }
});
// eslint-disable-next-line prettier/prettier
UserSchema.pre("save", async function (this: IUserDocument) {
  if (!this.bio || this.bio.length === 0) {
    this.bio = `soc-med user from ${new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }
});

UserSchema.methods.comparePassword = async function (
  this: IUserDocument,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.createResetPasswordToken = function (this: IUserDocument) {
  const resetToken = getResetToken();
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

export const UserModel = model<IUserDocument, IUserModel>("users", UserSchema);
