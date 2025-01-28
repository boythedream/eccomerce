import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelRoute() {
  return (
    <section className="w-full min-h-[80vh] flex justify-center items-center">
      <Card className="w-[350]">
        <div className="p-6">
          <div className="flex justify-center items-center gap-4 w-full">
            <XCircle className="h-12 w-12 text-red-500 bg-red-500/30 p-2" />
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <h1 className="mt-3 text-2xl font-bold">Payment Cancelled</h1>
            <p className="mt-3 text-sm text-gray-500">
              Something went wrong, so don&apos;t worry. You haven&apos;t been charged. Please try again later.
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/">Go back to HomePage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
