// @ts-ignore TS6133
import { test } from "@jest/globals";
import { util } from "../helpers/util";

import { 
  ZodFirstPartySchemaTypes,
  ZodFirstPartyTypeKind,
} from "..";

test("Identify missing [ZodFirstPartySchemaTypes]", () => {
  type ZodFirstPartySchemaForType<T extends ZodFirstPartyTypeKind> = ZodFirstPartySchemaTypes extends infer Schema
    ? Schema extends { _def: { typeName: T } }
      ? Schema
      : never
    : never;
  type ZodMappedTypes = { [key in ZodFirstPartyTypeKind]: ZodFirstPartySchemaForType<key> };
  type ZodFirstPartySchemaTypesMissingFromUnion = keyof { [key in keyof ZodMappedTypes as ZodMappedTypes[key] extends { _def: never } ? key : never]: unknown };

  util.assertNever({} as ZodFirstPartySchemaTypesMissingFromUnion);
});