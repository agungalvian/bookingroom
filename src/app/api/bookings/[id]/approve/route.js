import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request, { params }) {
    try {
        const session = await auth();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { status, notes } = body;

        const booking = await prisma.booking.update({
            where: { id },
            data: {
                status,
                notes: notes || null,
            },
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Booking approval error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
