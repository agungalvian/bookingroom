import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { id } from "date-fns/locale";
import MonthlyReportView from "@/components/MonthlyReportView";

export default async function MonthlyReportPage({ searchParams }) {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    const params = await searchParams;

    // Get month and year from query params or use current month
    const now = new Date();
    const month = params.month ? parseInt(params.month) : now.getMonth();
    const year = params.year ? parseInt(params.year) : now.getFullYear();

    const reportDate = new Date(year, month, 1);
    const monthStart = startOfMonth(reportDate);
    const monthEnd = endOfMonth(reportDate);

    // Fetch all data for the month
    const [bookings, rooms, users] = await Promise.all([
        prisma.booking.findMany({
            where: {
                startTime: {
                    gte: monthStart,
                    lte: monthEnd,
                },
            },
            include: {
                room: true,
                user: true,
            },
            orderBy: { startTime: 'asc' },
        }),
        prisma.room.findMany({
            include: {
                bookings: {
                    where: {
                        startTime: {
                            gte: monthStart,
                            lte: monthEnd,
                        },
                        status: 'APPROVED',
                    },
                },
            },
        }),
        prisma.user.findMany({
            include: {
                _count: {
                    select: {
                        bookings: {
                            where: {
                                startTime: {
                                    gte: monthStart,
                                    lte: monthEnd,
                                },
                            },
                        },
                    },
                },
            },
        }),
    ]);

    // Calculate statistics
    const stats = {
        total: bookings.length,
        approved: bookings.filter(b => b.status === 'APPROVED').length,
        rejected: bookings.filter(b => b.status === 'REJECTED').length,
        pending: bookings.filter(b => b.status === 'PENDING').length,
        cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
    };

    // Room usage statistics
    const roomStats = rooms.map(room => ({
        name: room.name,
        capacity: room.capacity,
        bookingCount: room.bookings.length,
        totalHours: room.bookings.reduce((sum, booking) => {
            const hours = (new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60);
            return sum + hours;
        }, 0),
    })).sort((a, b) => b.bookingCount - a.bookingCount);

    // Top users
    const topUsers = users
        .filter(u => u._count.bookings > 0)
        .map(u => ({
            name: u.name,
            email: u.email,
            bookingCount: u._count.bookings,
        }))
        .sort((a, b) => b.bookingCount - a.bookingCount)
        .slice(0, 10);

    const reportData = {
        month: format(reportDate, 'MMMM yyyy', { locale: id }),
        monthStart,
        monthEnd,
        stats,
        roomStats,
        topUsers,
        bookings,
    };

    return (
        <div>
            <MonthlyReportView data={reportData} />
        </div>
    );
}
