/* eslint-disable prettier/prettier */
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { getUserFromToken } from "../../utils/AuthHelper";
import { throwAnError } from "../../utils/GQLError";
import { SocMedServerContext } from "../types";

const isMHAdminDirectiveArgumentMaps: Record<string, any> = {};
const authDirectiveArgumentMaps: Record<string, any> = {};

export const authDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const isMHAdminDirective = getDirective(schema, type, "isMHAdmin")?.[0];
      if (isMHAdminDirective)
        isMHAdminDirectiveArgumentMaps[type.name] = isMHAdminDirective;
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const isMHAdminDirective =
        getDirective(schema, fieldConfig, "isMHAdmin")?.[0] ??
        isMHAdminDirectiveArgumentMaps[typeName];
      if (isMHAdminDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = function (source, args, context, info) {
          if (context.isMHAdmin) return resolve(source, args, context, info);
          throw new GraphQLError("invalid service token");
        };
        return fieldConfig;
      }
    },
  });

export const userAuthDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const isAuthDirective = getDirective(schema, type, "auth")?.[0];
      if (isAuthDirective)
        authDirectiveArgumentMaps[type.name] = isAuthDirective;
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _filename, typeName) => {
      const authDirective =
        getDirective(schema, fieldConfig, "auth")?.[0] ??
        authDirectiveArgumentMaps[typeName];
      if (authDirective) {
        console.log("auth", "test");

        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (
          source,
          args,
          context: SocMedServerContext,
          info
        ) {
          // if (context.isMHAdmin) return resolve(source, args, context, info);
          if (context.accessToken) {
            console.log("inside");
            try {
              const userId = await getUserFromToken(context.accessToken);
              if (userId) {
                context.userId = userId;
                return resolve(source, args, context, info);
              }
            } catch (err) {
              throwAnError(err);
            }
          }
          throw new GraphQLError("Not authenticated / Not allowed field", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        };
        return fieldConfig;
      }
    },
  });
