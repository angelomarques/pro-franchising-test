"use client";

import { Input } from "@/components/input";
import { LoginUserSchema, LoginUserSchemaType } from "@/lib/schemas/loginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import styles from "./form.module.css";
import { signIn } from "next-auth/react";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
  });

  const onSubmit = (data: LoginUserSchemaType) => {
    signIn("credentials", { ...data });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit">Entrar</Button>
    </form>
  );
};
