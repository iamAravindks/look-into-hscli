import { CacheService } from "@hubspire/cache-directive";
import { getLoaders } from "../libs/config";
import { SocMedServerContext } from "../libs/types";
import { Modules } from "../modules";

export enum ContextValueType {
  mhToken = "MH_TOKEN",
  authenticated = "AUTHENTICATED",
  unAuthenticated = "UNAUTHENTICATED",
}

export const MockContextValue = (
  type: ContextValueType,
  cache: CacheService,
  accessToken?: string
): SocMedServerContext => {
  switch (type) {
    case ContextValueType.mhToken:
      return {
        isMHAdmin: true,
        accessToken: undefined,
        cacheContext: { cache, sessionId: null },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    case ContextValueType.authenticated:
      return {
        isMHAdmin: false,
        accessToken,
        cacheContext: { cache, sessionId: accessToken! },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    default:
      return {
        isMHAdmin: false,
        accessToken: undefined,
        cacheContext: { cache, sessionId: null },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
  }
};
