import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { waitlistSchema } from "@/lib/waitlist"

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ code: "DATABASE_MISSING" }, { status: 500 })
  }

  try {
    const json = await request.json()
    const payload = waitlistSchema.parse(json)
    const normalizedEmail = payload.workEmail.toLowerCase()

    const existing = await prisma.waitlist.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { workEmail: normalizedEmail }],
      },
      select: {
        id: true,
      },
    })

    if (existing) {
      return NextResponse.json({ code: "DUPLICATE_EMAIL" }, { status: 409 })
    }

    await prisma.waitlist.create({
      data: {
        fullName: payload.fullName,
        email: normalizedEmail,
        workEmail: normalizedEmail,
        company: payload.company,
        role: payload.role,
        teamSize: payload.teamSize,
        useCase: payload.useCase,
      },
      select: {
        workEmail: true,
      },
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ code: "INVALID_PAYLOAD" }, { status: 400 })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ code: "DUPLICATE_EMAIL" }, { status: 409 })
      }
      if (error.code === "P2021") {
        return NextResponse.json({ code: "TABLE_MISSING" }, { status: 500 })
      }
      if (error.code === "P2022") {
        return NextResponse.json({ code: "COLUMN_MISMATCH" }, { status: 500 })
      }
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json({ code: "DATABASE_CONNECTION_FAILED" }, { status: 500 })
    }

    console.error("waitlist_insert_failed", error)
    return NextResponse.json({ code: "INSERT_FAILED" }, { status: 500 })
  }
}
