export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/pdv",
    "/cart",
    "/products",
    "/products/:productId/edit",
    "/products/create",
  ],
};
