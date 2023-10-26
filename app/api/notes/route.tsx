import prisma from "@/prisma";
import { note } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const GET =  async (req:NextRequest, res:NextResponse) => {
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const allnotes = await prisma.note.findMany({
        where: {
            ownerId: userid
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
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const spaceid = url.searchParams.get('spaceid') || ''
    const body = await req.json()
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