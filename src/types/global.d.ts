import { EnvSchemaType } from "@/lib/schemas/env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
