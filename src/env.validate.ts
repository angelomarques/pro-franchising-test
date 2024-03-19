import { ZodError } from "zod";
import { EnvSchema } from "./lib/schemas/env";

try {
  EnvSchema.parse(process.env);
} catch (err) {
  if (err instanceof ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(", ")}` : field
      )
      .join("\n  ");
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }
}
