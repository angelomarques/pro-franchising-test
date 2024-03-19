import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, { message: "Senha deve ter um mínimo de 6 caracteres" }),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
