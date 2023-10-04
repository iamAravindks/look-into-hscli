/* eslint-disable prettier/prettier */
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const getToken = (args: any, expiresIn: string) =>
  jwt.sign(args, process.env.JWT_SECRET as string, { expiresIn: expiresIn });

export const getResetToken = () => {
  const charset = "0123456789abcdefghijklmnopqrstuvwxyz";
  const length = 6;
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }
  return token;
};

export const getHash = (obj: any) => {
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(obj));
  return hash.digest("hex");
};
