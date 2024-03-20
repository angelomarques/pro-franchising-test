import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateProductSchema } from "@/lib/schemas/createProduct";
import { ZodError } from "zod";

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const url = new URL(req.url);

  const limitParam = url.searchParams.get("limit");
  const pageParam = url.searchParams.get("page");

  const queryParams = {
    limit: limitParam ? parseInt(limitParam) : 15,
    page: pageParam ? parseInt(pageParam) : 1,
  };

  try {
    const products = await db.product.findMany({
      include: {
        category: true,
      },
      take: queryParams.limit,
      skip: (queryParams.page - 1) * queryParams.limit,
      orderBy: {
        updatedAt: "desc",
      },
    });

    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response("Server response error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const { price, ...payload } = CreateProductSchema.parse(body);

    const product = await db.product.create({
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
