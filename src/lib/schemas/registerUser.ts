import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, { message: "Senha deve ter um mínimo de 6 caracteres" }),
});
