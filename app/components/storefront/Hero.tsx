import prisma from "@/app/lib/db";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

async function getData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return data;
}

export async function Hero() {
    const data = await getData();

    if (!data || data.length === 0) {
        return <div>No banners available</div>;
    }

    return (
        <Carousel>
            <CarouselContent>
                {data.map((item) => (
                    <CarouselItem key={item.id}>
                        <div className="relative h-[60vh] lg:h-[80vh]">
                            <Image 
                                alt="Banner Image" 
                                src={item.imageString} 
                                fill 
                                className="object-cover w-full h-full rounded-xl" 
                            />
                            <div className="absolute top-6 left-6 bg-opacity-75 bg-black rounded-xl shadow-lg">
                                <h1 className="text-xl lg:text-3xl p-6 font-bold text-white transition-transform hover:scale-105  ">
                                    {item.title}
                                </h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
        </Carousel>
    );
}
