import { deleteBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Define the PageProps for this specific component
type PageProps = {
  params: {
    id: string;
  };
};

export default async function DeleteBannerRoute({ params }: PageProps) {
  // You can safely use params.id here as it's already typed
  const bannerId = params.id;

  // Logic to delete the banner using the bannerId can go here
  const handleDelete = async () => {
    await deleteBanner(bannerId);
    // Optionally navigate away after deletion
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the banner and all of its data from our server.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard/banner">Cancel</Link>
            </Button>
            <form action={handleDelete} className="flex-1">
              <input type="hidden" name="bannerId" value={bannerId} />
              <SubmitButton variant="destructive" className="w-full" text="Delete Banner" />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}


        
         
