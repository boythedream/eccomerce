import { addItem } from "@/app/actions";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { ShoppingBagButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      price: true,
      images: true,
      name: true,
      description: true,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

type Props = {
  readonly params: Readonly<{ id: string }>;
  readonly searchParams: Readonly<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductIdRoute({ params }: Props) {
  const data = await getData(params.id);
  const addProductShoppingCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 tracking-tight text-gray-900">
            ${data.price.toFixed(2)}
          </p>
          <div className="mt-3 flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className="h-4 w-4 text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{data.description}</p>
          </div>
          <form action={addProductShoppingCart} className="mt-6">
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
