import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";
import ReportView from "@/components/ReportView";

export default async function AdminReportsPage() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const [totalBookings, approvedBookings, rejectedBookings, pendingBookings, rooms, bookings] = await Promise.all([
        prisma.booking.count(),
        prisma.booking.count({ where: { status: 'APPROVED' } }),
        prisma.booking.count({ where: { status: 'REJECTED' } }),
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.room.findMany({
            include: {
                _count: {
                    select: { bookings: true },
                },
            },
        }),
        prisma.booking.findMany({
            where: {
                createdAt: {
                    gte: monthStart,
                    lte: monthEnd,
                },
            },
            include: {
                room: true,
                user: true,
            },
            orderBy: { createdAt: 'desc' },
        }),
    ]);

    const stats = {
        totalBookings,
        approvedBookings,
        rejectedBookings,
        pendingBookings,
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Laporan Penggunaan</h1>
                <p className="text-text-light mt-1">Statistik dan analisis pemesanan ruang meeting</p>
            </div>

            <ReportView stats={stats} rooms={rooms} bookings={bookings} />
        </div>
    );
}
