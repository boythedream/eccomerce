import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();

    const signature = req.headers.get("Stripe-Signature") as string;

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (error: unknown) {
        console.error("Webhook error:", error);
        return new Response("Webhook error", { status: 400 });
    }

    switch(event.type){
        case "checkout.session.completed":{

            const session = event.data.object;
            await prisma.order.create({
                data: {
                    amount:session.amount_total as number,
                    status:session.status as string,
                    userId:session.metadata?.userId as string,
                }
            });
            
            await redis.del(`cart-${session.metadata?.userId}`);
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return new Response(null, {status:200});
}