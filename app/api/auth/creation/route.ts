import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Route handler started");
        const { getUser } = getKindeServerSession();
        console.log("Kinde session retrieved");

        const user = await getUser();
        console.log("User retrieved:", user ? JSON.stringify(user) : "No user");

        if (!user || !user.id) {
            console.error("No user or user ID found");
            return NextResponse.json(
                { error: "Unauthorized" }, 
                { status: 401 }
            );
        }

        let dbUser = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });

        console.log("DB User check complete:", dbUser ? JSON.stringify(dbUser) : "No existing user");

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",                           
                    email: user.email ?? "",
                    profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
            });
            console.log("New user created");
        }

        return new NextResponse(null, {
            status: 302,
            headers: {
                Location: "http://localhost:3000/"
            }
        });

    } catch (error) {
        // Safely log the error without using console.log directly
        console.error(error instanceof Error ? error.message : String(error));
        
        return NextResponse.json(
            { 
                error: "Internal Server Error", 
                details: error instanceof Error 
                    ? error.message 
                    : String(error)
            }, 
            { status: 500 }
        );
    }
}