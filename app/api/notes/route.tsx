import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET =  async (req:NextRequest, res:NextResponse) => {
    // const param = url.searchParams.get("userId")
    const allnotes = await prisma.note.findMany({
        where: {
            ownerId: "clo4fnfkc0000i8fcud910wdl"
        },
        })
    return NextResponse.json(allnotes)
}