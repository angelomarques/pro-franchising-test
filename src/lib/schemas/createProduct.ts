import { z } from "zod";

export const CreateProductSchema = z.object({
  title: z.string({ required_error: "Título obrigatório" }),
  description: z.string().optional(),
  image: z.string({ required_error: "Imagem obrigatória" }),
  price: z.string({ required_error: "Preço é obrigatório" }),
  fakeStoreId: z.number().optional(),
  categoryId: z.string({ required_error: "Categoria é obrigatória" }),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
