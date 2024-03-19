import prisma from "@/lib/db";

async function main(){
    await prisma.subscription.create();
}