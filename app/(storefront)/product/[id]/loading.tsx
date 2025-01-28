import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoadingRoute(){
    return(
        <div className="grid md:grid-cols-2 gap-6 items-start lg:gap-x-24">
            <div>
                <Skeleton className="w-full h-[600px]"/>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Skeleton className="w-full h-[100px]"/>
                    <Skeleton className="w-full h-[100px]"/>
                    <Skeleton className="w-full h-[100px]"/></div>
            </div>
         <div>
            <Skeleton className="w-56 h-12"/>
            <Skeleton className="w-36 h-12 mt-4"/>
            <Skeleton className="w-full h-60 mt-4"/>
            <Skeleton className="w-full h-12 mt-4"/>
         </div>
        </div>
    )
}