import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";

async function getData(){
    const data = await prisma.order.findMany({
        select:{
            amount:true,
            id:true,
            User:{
                select:{
                    firstName:true,
                    profileImage:true,
                    email:true
                }
            }
        },
        orderBy:{
            createdAt:'desc'
        },
        take:7
    });
    return data;

}
export  async function RecentSales() {
    const data = await getData();
    return(
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">Recent Sales</CardTitle>
            <CardContent className="flex flex-col gap-8">
             {data.map((item) => (
                 <div key={item.id} className="flex items-center gap-4">
                 <Avatar className="hidden sm:flex h-9 w-9">
                 {item.User?.profileImage && (
    <AvatarImage src={item.User?.profileImage} alt="Avatar image" />
  )}
                   <AvatarFallback>{item.User?.firstName.slice(0,3)}</AvatarFallback>
                 </Avatar>
                 <div className="grid gap-1">
                   <p className="text-sm font-medium">{item.User?.firstName}</p>
                   <p className="text-sm text-muted-foreground">
                     {item.User?.email}
                   </p>
                 </div>
                 <div className="ml-auto font-medium">${new Intl.NumberFormat('en-US').format(item.amount /100)}</div>
               </div>
            ))}
             
            </CardContent>
          </CardHeader>
        </Card>
    )
}