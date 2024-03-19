import { RegisterUserSchemaType } from "@/lib/schemas/registerUser";
import { api } from "./api";

export const registerUser = async (payload: RegisterUserSchemaType) => {
  await api.post("/auth/register", payload);
};
