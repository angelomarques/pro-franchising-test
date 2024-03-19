import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { FakeStoreProductType } from "@/types/product";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const { data } = await axios.get<FakeStoreProductType[]>(
      "https://fakestoreapi.com/products",
      {
        params: {
          limit: 15,
        },
      }
    );
    const { data: categoriesData } = await axios.get<string[]>(
      "https://fakestoreapi.com/products/categories"
    );

    await prisma.productCategory.createMany({
      data: categoriesData.map((item) => ({
        title: item,
      })),
    });

    const categories = await prisma.productCategory.findMany();

    await prisma.product.createMany({
      data: data.map((item) => ({
        fakeStoreId: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
        categoryId:
          categories.find((category) => category.title === item.category)?.id ||
          "",
      })),
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect PrismaClient after seeding
    await prisma.$disconnect();
  }
}

// Call the seedDatabase function to start seeding
seedDatabase();
