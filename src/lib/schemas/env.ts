import { z } from "zod";

export const EnvSchema = z.object({
  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),

  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),

  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),

  BASE_URL: z.string(),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
