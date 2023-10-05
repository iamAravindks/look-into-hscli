/* eslint-disable prettier/prettier */
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { getUserFromToken } from "../../utils/AuthHelper";
import { SocMedServerContext } from "../types";

const isMHAdminDirectiveArgumentMaps: Record<string, any> = {};
const authDirectiveArgumentMaps: Record<string, any> = {};

export const authDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const isMHAdminDirective = getDirective(schema, type, "isMHAdmin")?.[0];
      const isAuthDirective = getDirective(schema, type, "auth")?.[0];

      if (isMHAdminDirective) {
        isMHAdminDirectiveArgumentMaps[type.name] = isMHAdminDirective;
      }

      if (isAuthDirective) {
        authDirectiveArgumentMaps[type.name] = isAuthDirective;
      }

      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const isMHAdminDirective =
        getDirective(schema, fieldConfig, "isMHAdmin")?.[0] ??
        isMHAdminDirectiveArgumentMaps[typeName];

      const authDirective =
        getDirective(schema, fieldConfig, "auth")?.[0] ??
        authDirectiveArgumentMaps[typeName];

      if (isMHAdminDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = function (source, args, context, info) {
          console.log("mh");
          if (context.isMHAdmin) return resolve(source, args, context, info);
          throw new GraphQLError("invalid service token");
        };
      }

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (
          source,
          args,
          context: SocMedServerContext,
          info
        ) {
          console.log("is this auth directive");

          if (context.isMHAdmin) return resolve(source, args, context, info);

          if (context.accessToken) {
            console.log(context.accessToken);
            try {
              const user = await getUserFromToken(context.accessToken);
              console.log(user);
              if (user) {
                context.userId = user;
                return resolve(source, args, context, info);
              }
            } catch (err) {}
          }
          throw new GraphQLError("Not authenticated / Not allowed field", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        };
        return fieldConfig;
      }

      return fieldConfig;
    },
  });
