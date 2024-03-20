import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdateProductSchema } from "@/lib/schemas/updateProduct";
import { ZodError } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const product = await db.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
      },
    });

    return new Response(JSON.stringify(product));
  } catch (error) {
    return new Response("Server response error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const { price, ...payload } = UpdateProductSchema.parse(body);

    const product = await db.product.update({
      where: {
        id: params.id,
      },
      data: { price: Number(price), ...payload },
    });

    return new Response(JSON.stringify(product));
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Server Response Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    await db.product.delete({
      where: {
        id: params.id,
      },
    });

    return new Response("Ok");
  } catch (error) {
    return new Response("Server Response Error", {
      status: 500,
    });
  }
}
