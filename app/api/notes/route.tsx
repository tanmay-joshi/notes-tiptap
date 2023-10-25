import prisma from "@/prisma";
import { note } from "@prisma/client";
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

export const POST = async (req:NextRequest, res:NextResponse) => {
    const body = await req.json()
    const newNote = await prisma.note.create({
        data: {
            title: body.title,
            content: body.content,
            ownerId: "clo4fnfkc0000i8fcud910wdl",
            spaceId: "clo4fp90o0002i8fcmsld36su",
        },
    })
    return NextResponse.json(newNote)
}