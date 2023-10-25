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

export const PUT = async (req:NextRequest, res:NextResponse) => {
    const body = await req.json()
    const updatedNote = await prisma.note.update({
        where: {
            id: body.id
        },
        data: {
            content: body.content
        }
    })
    return NextResponse.json(updatedNote)
}