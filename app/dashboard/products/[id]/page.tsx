import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { EditForm } from "../../EditForm";

async function getData(productId: string) {
  if (!productId) {
    throw new Error("Product ID is required.");
  }

  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  if (!params?.id) {
    throw new Error("Missing product ID in route parameters.");
  }

  const data = await getData(params.id);

  return <EditForm data={data} />;
}
