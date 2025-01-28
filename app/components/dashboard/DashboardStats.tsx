import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

async function getData() {
  const [user, products, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);
  return {
    user,
    products,
    order,
  };
}

export async function DashboardStats() {
  const { products, user, order } = await getData();
  const totalAmount = order.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
          <DollarSign className="w-5 h-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">
            ${new Intl.NumberFormat("en-US").format(totalAmount / 100)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Total Sale</CardTitle>
          <ShoppingBag className="w-5 h-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">{order.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Total sales on RezoShop
          </p>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Total Products</CardTitle>
          <PartyPopper className="w-5 h-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">{products.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Total Products on RezoShop
          </p>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
          <User2 className="w-5 h-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">{user.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Total Users Signup on RezoShop
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
