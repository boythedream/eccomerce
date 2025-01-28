import { checkOut, deleteItem } from "@/app/actions";
import { CheckoutButton, DeleteButton } from "@/app/components/SubmitButton";
import { Cart } from "@/app/lib/interface";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BagRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-10 min-h-[50vh] flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 flex-col p-8">
            <div className="flex flex-col items-center gap-y-5">
                <ShoppingBag className="h-24 w-24 text-primary" />
                <p className="text-2xl font-semibold text-gray-700 text-center">
                    Your bag is empty
                </p>
                <p className="text-md text-gray-500 text-center max-w-md">
                    Explore our collection and add some amazing items to your cart. 
                    Great products are just a click away!
                </p>
                <Button asChild>
                    <Link href={"/"}>Shop Now</Link>
                </Button>
            </div>
        </div>
        );
    }

    let totalPrice = 0;
    cart.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });

    return (
        <div className="max-w-2xl mx-auto mt-10 min-h[50vh]">
            <div className="flex flex-col gap-y-10">
                {cart.items.map((item) => (
                    <div key={item.id} className="flex">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                            <Image
                                fill
                                className="rounded-md object-cover"
                                src={item.imageString}
                                alt="Product image"
                            />
                        </div>
                        <div className="ml-5 flex justify-between w-full font-medium">
                            <p>{item.name}</p>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-center gap-x-2">
                                    <p>{item.quantity} X</p>
                                    <p>${item.price}</p>
                                </div>
                                <form action={deleteItem} className="text-end">
                                    <input type="hidden" name="productId" value={item.id} />
                                    <DeleteButton />
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-10">
                    <div className="flex justify-between items-center">
                        <p>Subtotal</p>
                        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}</p>
                    </div>
                    <form action={checkOut}>
                    <CheckoutButton/>
                    </form>
                </div>
            </div>
        </div>
    );
}
