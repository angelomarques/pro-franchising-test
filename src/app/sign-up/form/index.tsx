"use client";

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import {
  RegisterUserSchema,
  RegisterUserSchemaType,
} from "@/lib/schemas/registerUser";

import styles from "./form.module.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser as registerUserService } from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();

  const { mutate: registerUser } = useMutation({
    mutationFn: registerUserService,
    onSuccess: () => {
      toast.success("Usuário criado com sucesso");
      router.push("/sign-in");
    },
    onError: () => {
      toast.error("Ocorreu um erro! Tente novament mais tarde.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = (data: RegisterUserSchemaType) => {
    registerUser(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        placeholder="Digite seu nome"
        label="Nome"
        error={errors.name?.message}
      />

      <Input
        {...register("email")}
        placeholder="Digite seu email"
        label="Email"
        error={errors.email?.message}
      />

      <Input
        {...register("password")}
        placeholder="Digite sua senha"
        label="Senha"
        type="password"
        error={errors.password?.message}
      />
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
