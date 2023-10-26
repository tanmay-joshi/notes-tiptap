import prisma from "@/prisma";
import { note } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const GET =  async (req:NextRequest, res:NextResponse) => {
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const spaceid = url.searchParams.get('spaceid') || ''
    const allnotes = await prisma.note.findMany({
        where: {
            spaceId: spaceid,
            ownerId: userid,
        },
        })
    return NextResponse.json(allnotes)
}

export const PUT = async (req:NextRequest, res:NextResponse) => {
    const body = await req.json()
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const updatedNote = await prisma.note.update({
        where: {
            id: body.id
        },
        data: {
            content: body.content,
            title: body.title
        }
    })
    return NextResponse.json(updatedNote)
}

export const POST = async (req:NextRequest, res:NextResponse) => {
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const spaceid = url.searchParams.get('spaceid') || ''
    const body = await req.json()
    console.log("post request to create note", userid, spaceid)
    const newNote = await prisma.note.create({
        data: {
            title: body.title,
            content: body.content,
            ownerId: userid,
            spaceId: spaceid,
        },
    })
    return NextResponse.json(newNote)
}

export const DELETE = async (req:NextRequest, res:NextResponse) => {
    const body =  await req.json()
    const deletedNote = await prisma.note.delete({
        where: {
            id: body.id
        }
    })
    return NextResponse.json(deletedNote)
}