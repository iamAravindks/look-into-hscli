/* eslint-disable prettier/prettier */
import { GraphQLError } from "graphql/error";

export class GQLError extends GraphQLError {
  code: string;
  status: number;
  extraInfo: { any: any }[] | undefined;
  constructor(
    message: string,
    code: string,
    status: number = 500,
    extraInfo?: Array<{ any: any }>
  ) {
    super(message, {
      extensions: {
        code,
        ...extraInfo,
        http: {
          status: status,
        },
      },
    });

    this.message = message;
    this.code = code;
    this.status = status;
    this.extraInfo = extraInfo;
  }
}
export type TError = GQLError | Error | unknown;

export const throwAnError = (error: TError) => {
  if (error instanceof GQLError) {
    throw new GQLError(error.message, error.code, error.status);
  } else if (error instanceof Error)
    throw new GQLError(error.message, "INTERNAL_SERVER_ERROR");
  else throw new GQLError("Internal server error", "INTERNAL_SERVER_ERROR");
};
