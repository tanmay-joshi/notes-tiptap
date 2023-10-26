import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET =  async (req:NextRequest, res:NextResponse) => {
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const allspaces = await prisma.space.findMany({
        where: {
            ownerId: userid
        },
        })
    return NextResponse.json(allspaces)
}

export const POST = async (req:NextRequest, res:NextResponse) => {
    const reqbody = await req.json()
    const url = new URL(req.nextUrl)
    const userid = url.searchParams.get('userid') || ''
    const newSpace = await prisma.space.create({
        data: {
            name: reqbody.name,
            ownerId: userid,
        },
    })
    return NextResponse.json(newSpace)
}