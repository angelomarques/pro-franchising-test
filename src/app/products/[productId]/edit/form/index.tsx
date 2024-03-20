"use client";

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import { Select } from "@/components/select";
import { UploadButton } from "@/components/upload-buton";
import {
  UpdateProductSchema,
  UpdateProductSchemaType,
} from "@/lib/schemas/updateProduct";
import { updateProduct as updateProductService } from "@/services/product";
import { getProductCategories } from "@/services/product-category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./form.module.css";
import { ProductType } from "@/types/product";

interface Props {
  productId: string;
  product: ProductType;
}

export const UpdateProductForm = ({ productId, product }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: productCategories } = useQuery({
    queryKey: ["products", "categories"],
    queryFn: () => getProductCategories(),
  });
  const categoryOptions =
    productCategories?.map((item) => ({
      value: item.id,
      label: item.title,
    })) || [];

  const { mutate: updateProduct } = useMutation({
    mutationFn: (payload: UpdateProductSchemaType) =>
      updateProductService(productId, payload),
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/");
    },
    onError: () => {
      toast.error("Ocorreu um erro! Tente novament mais tarde.");
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductSchemaType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      categoryId: product.categoryId,
      description: product.description ?? undefined,
      image: product.image,
      price: String(product.price),
      title: product.title,
    },
  });

  const onSubmit = (data: UpdateProductSchemaType) => {
    updateProduct(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title")}
        placeholder="Digite o título"
        label="Título do Produto"
        error={errors.title?.message}
      />

      <Input
        {...register("description")}
        placeholder="Digite a descrição"
        label="Descrição do produto"
        error={errors.description?.message}
      />

      <Input
        {...register("price")}
        placeholder="Digite o preço"
        label="Preço do produto"
        error={errors.price?.message}
      />

      <div>
        <Select
          options={categoryOptions}
          placeholder="Selecione a categoria"
          onChange={(value) => setValue("categoryId", value)}
        />

        {errors.categoryId?.message ? (
          <p className={styles.error}>{errors.categoryId?.message}</p>
        ) : null}
      </div>

      <div>
        <UploadButton onChange={(value) => setValue("image", value)} />

        {errors.image?.message ? (
          <p className={styles.error}>{errors.categoryId?.message}</p>
        ) : null}
      </div>
      <Button type="submit">Atualizar</Button>
    </form>
  );
};
