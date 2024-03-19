import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { RegisterUserSchema } from "@/lib/schemas/registerUser";
import { hash } from "bcrypt";
import { ZodError } from "zod";

export async function POST(req: Request) {
  //   const session = await getAuthSession();

  //   if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { email, name, password } = RegisterUserSchema.parse(body);

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response("User successfully created!");
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Server Error", {
      status: 500,
    });
  }
}
