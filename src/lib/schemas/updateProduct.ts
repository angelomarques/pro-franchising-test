import { z } from "zod";

export const UpdateProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.string(),
  categoryId: z.string().optional(),
});

export type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;
