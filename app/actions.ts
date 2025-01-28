
"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {parseWithZod} from "@conform-to/zod"
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interface";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
export async function createProduct(prevState:unknown, formData:FormData){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user.email !== 'razathedream3@gmail.com'){
        return redirect("/")
    }
    
    const submission = parseWithZod(formData,{
        schema:productSchema,
    
    })
    if(submission.status !== "success"){
        return submission.reply()
    }
    const flattenUrls = submission.value.images.flatMap((urlString)=>
        urlString.split(",").map((url)=>url.trim())
    )
    
    if (submission.status === "success") {
        await prisma.product.create({
            data: {
                name: submission.value.name,
                description: submission.value.description,
                status: submission.value.status,
                price: submission.value.price,
                images: flattenUrls,
                category: submission.value.category,
                isFeatured: submission.value.isFeatured === true ? true : false,
            }
        });
        return redirect("/dashboard/products");  // Ensure this redirection happens after product creation
    }

}

export async function editProduct(prevState:unknown, formData:FormData){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user.email !== 'razathedream3@gmail.com'){
        return redirect("/")
    }

    const submission = parseWithZod(formData,{
        schema:productSchema,

    })
    if(submission.status !== "success"){
        return submission.reply()
    }
    const flattenUrls = submission.value.images.flatMap((urlString)=>
        urlString.split(", ").map((url)=>url.trim())
    )

    if (submission.status === "success") {
        const productId =   formData.get("productId") as string
        await prisma.product.update({
            where:{
                id:productId
            },
            data: {
                name: submission.value.name,
                description: submission.value.description,
                status: submission.value.status,
                price: submission.value.price,
                images: flattenUrls,
                category: submission.value.category,
                isFeatured: submission.value.isFeatured === true ? true : false,
            }
        });
        return redirect("/dashboard/products");  // Ensure this redirection happens after product creation
    }

}

export async function deleteProduct(formData:FormData){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user.email !== 'razathedream3@gmail.com'){
        return redirect("/")
    }
    await prisma.product.delete({
        where:{
            id: formData.get("productId") as string
        }
    });
    return redirect("/dashboard/products");  // Ensure this redirection happens after product creation      
}   

export async function createBanner(prevState: unknown, formData: FormData){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user.email !== 'razathedream3@gmail.com'){
        return redirect("/")
    }
    const submission = parseWithZod(formData,{
        schema:bannerSchema,

    })
    if(submission.status !== "success"){
        return submission.reply()
    }
   
    if (submission.status === "success") {
        await prisma.banner.create({
            data: {
                title: submission.value.title,
                imageString: submission.value.imageString,
            }
        });
        return redirect("/dashboard/banner");  // Ensure this redirection happens after product creation
    }
}

export async function deleteBanner(formData:FormData){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || user.email !== 'razathedream3@gmail.com'){
        return redirect("/")
    }
    await prisma.banner.delete({
        where:{
            id: formData.get("bannerId") as string
        }
    });
    return redirect("/dashboard/banner");  // Ensure this redirection happens after product creation
}

export async function addItem( productId:string){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
        return redirect("/")
    }
    
    const cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select:{
            id:true,
            name:true,
            price:true,
            images:true,
        },
        where:{
            id:productId
        }
    });

    if(!selectedProduct){
        throw new Error("Product not found")
    }
   
    let myCart = {} as Cart;
    if(!cart || !cart.items){
        myCart = {
            userId:user.id,
            items:[
                
                {
                    price:selectedProduct.price,
                    id:selectedProduct.id,
                    imageString:selectedProduct.images[0],
                    name:selectedProduct.name,
                    quantity:1,

                }
                    
            ]
        };
    }
    else {
        let itemFound = false;
        myCart.items = cart.items.map((item)=>{
            if(item.id === productId){
                item.quantity += 1;
                itemFound = true;
            }
            return item;
        })
       
        if(!itemFound){
            myCart.items.push({
                price:selectedProduct.price,
                id:selectedProduct.id,
                imageString:selectedProduct.images[0],
                name:selectedProduct.name,
                quantity:1,
            })
        }
    }

    await redis.set(`cart-${user.id}`, myCart);
    revalidatePath("/","layout")
}

export async function deleteItem(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const productId = formData.get("productId");
    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (!cart || !cart.items) {
        return redirect("/");
    }

    // Update cart by filtering out the item with the specified productId
    const updateCart: Cart = {
        userId: user.id,
        items: cart.items.filter((item) => item.id !== productId),
    };

    // Set the updated cart in Redis
    await redis.set(`cart-${user.id}`, updateCart);

    // Revalidate the path
    revalidatePath("/", "layout");

}


export async function checkOut(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
        return redirect("/")
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`)

    if(cart &&cart.items){

        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item)=>{
            return {
                quantity:item.quantity,
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name,
                        images:[item.imageString]
                    },
                    unit_amount:item.price * 100
                }
            }
        })
        const session = await stripe.checkout.sessions.create({
            mode:"payment",
            line_items:line_items,
            success_url:`http://localhost:3000/payment/success`,
            cancel_url:`http://localhost:3000/payment/cancel`,
            metadata:{
                userId:user.id
            }
        })
        return redirect(session.url as string)
    }

}
