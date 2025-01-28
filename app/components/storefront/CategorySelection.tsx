import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";

export function CategorySelection() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
                    Shop by Category
                </h2>

                <Link 
                    className="group flex items-center text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/80" 
                    href="/products/all"
                >
                    Browse all Products 
                    <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </Link>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-8">
                {/* All Products Card - Takes 6 columns */}
                <div className="sm:col-span-6 group relative h-[500px] sm:h-[650px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
                    <Image 
                        src={all} 
                        alt="All products category" 
                        className="object-cover object-center w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                        priority
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                <Link href="/products/all" className="hover:underline">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    All Products
                                </Link>
                            </h3>
                            <p className="text-white/90 text-sm font-medium">
                                Explore our complete collection
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side Container - Takes 6 columns */}
                <div className="sm:col-span-6 grid grid-cols-1 gap-8">
                    {/* Men's Category Card */}
                    <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
                        <Image 
                            src={men} 
                            alt="Men&apos;s category" 
                            className="object-cover object-center w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    <Link href="/products/men" className="hover:underline">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        Men&apos;s Collection
                                    </Link>
                                </h3>
                                <p className="text-white/90 text-sm font-medium">
                                    Style for every occasion
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Women's Category Card - Elevated position */}
                    <div className="group relative h-[300px] sm:-mt-8 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
                        <Image 
                            src={women} 
                            alt="Women&apos;s category" 
                            className="object-cover object-center w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    <Link href="/products/women" className="hover:underline">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        Women&apos;s Collection
                                    </Link>
                                </h3>
                                <p className="text-white/90 text-sm font-medium">
                                    Elevate your wardrobe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
