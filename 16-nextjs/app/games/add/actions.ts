"use server";

import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

export async function createGame(formData: FormData) {
    const title       = formData.get("title") as string;
    const developer   = formData.get("developer") as string;
    const genre       = formData.get("genre") as string;
    const price       = parseFloat(formData.get("price") as string);
    const releasedate = new Date(formData.get("releasedate") as string);
    const description = formData.get("description") as string;
    const cover       = formData.get("cover") as string;
    const consoleId   = parseInt(formData.get("consoleId") as string);

    // Validaciones básicas
    if (!title || !developer || !genre || isNaN(price) || !cover || isNaN(consoleId)) {
        throw new Error("All fields are required.");
    }

    await prisma.games.create({
        data: {
            title,
            developer,
            genre,
            price,
            releasedate,
            description,
            cover,
            console_id: consoleId,
        },
    });

    revalidatePath("/games");
    redirect("/games");
}