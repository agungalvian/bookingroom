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

        // Get the booking
        const booking = await prisma.booking.findUnique({
            where: { id },
        });

        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        if (booking.status !== 'APPROVED') {
            return NextResponse.json(
                { message: "Hanya pemesanan yang sudah disetujui yang bisa dibatalkan" },
                { status: 400 }
            );
        }

        // Cancel the booking
        const cancelledBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: 'CANCELLED',
                notes: 'Dibatalkan oleh admin',
            },
        });

        return NextResponse.json(cancelledBooking);
    } catch (error) {
        console.error("Booking cancellation error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
