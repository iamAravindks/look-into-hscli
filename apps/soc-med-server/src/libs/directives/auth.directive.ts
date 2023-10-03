import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";

const isMHAdminDirectiveArgumentMaps: Record<string, any> = {};

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
