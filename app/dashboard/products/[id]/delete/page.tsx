import { deleteProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteRoute({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // Ensure params.id is resolved here.

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the
            product and all of its data from our server.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard/products">Cancel</Link>
            </Button>
            <form action={deleteProduct} className="flex-1">
              <input type="hidden" name="productId" value={id} />
              <SubmitButton variant="destructive" text="Delete Product"
                />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
