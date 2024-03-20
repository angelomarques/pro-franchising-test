import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

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
    const productCategories = await db.productCategory.findMany({
      take: queryParams.limit,
      skip: (queryParams.page - 1) * queryParams.limit,
      orderBy: {
        updatedAt: "desc",
      },
    });

    return new Response(JSON.stringify(productCategories));
  } catch (error) {
    return new Response("Server response error", {
      status: 500,
    });
  }
}
