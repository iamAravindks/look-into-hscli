import { Request } from "express";

export function ServiceVerify(req: Request) {
  return String(req.headers["mh-token"]) === String(process.env.SERVICE_TOKEN);
}
