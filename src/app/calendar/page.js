import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CalendarView from "@/components/CalendarView";

export default async function CalendarPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    const bookings = await prisma.booking.findMany({
        where: {
            status: { in: ['APPROVED', 'PENDING'] },
        },
        include: {
            room: true,
            user: true,
        },
        orderBy: { startTime: 'asc' },
    });

    const rooms = await prisma.room.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Kalendar Ruang Meeting</h1>
                <p className="text-text-light mt-1">Lihat jadwal pemesanan ruang meeting</p>
            </div>

            <CalendarView bookings={bookings} rooms={rooms} />
        </div>
    );
}
