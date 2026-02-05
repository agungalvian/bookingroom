"use client";

import { PieChart, BarChart, Calendar, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

export default function ReportView({ stats, rooms, bookings }) {
    const roomUsage = rooms.map((room) => ({
        name: room.name,
        count: room._count.bookings,
    })).sort((a, b) => b.count - a.count);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-text-light text-sm">Total Pemesanan</p>
                            <p className="text-3xl font-bold text-primary mt-1">{stats.totalBookings}</p>
                        </div>
                        <Calendar className="text-primary opacity-20" size={48} />
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-text-light text-sm">Disetujui</p>
                            <p className="text-3xl font-bold text-green-500 mt-1">{stats.approvedBookings}</p>
                        </div>
                        <CheckCircle className="text-green-500 opacity-20" size={48} />
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-text-light text-sm">Ditolak</p>
                            <p className="text-3xl font-bold text-red-500 mt-1">{stats.rejectedBookings}</p>
                        </div>
                        <XCircle className="text-red-500 opacity-20" size={48} />
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-text-light text-sm">Menunggu</p>
                            <p className="text-3xl font-bold text-yellow-500 mt-1">{stats.pendingBookings}</p>
                        </div>
                        <Clock className="text-yellow-500 opacity-20" size={48} />
                    </div>
                </div>
            </div>

            {/* Room Usage */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BarChart size={24} className="text-primary" />
                    Penggunaan Ruang Meeting
                </h2>
                <div className="space-y-3">
                    {roomUsage.map((room, idx) => {
                        const percentage = stats.totalBookings > 0
                            ? (room.count / stats.totalBookings * 100).toFixed(1)
                            : 0;
                        return (
                            <div key={idx}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">{room.name}</span>
                                    <span className="text-sm text-text-light">{room.count} pemesanan ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Calendar size={24} className="text-primary" />
                    Pemesanan Bulan Ini
                </h2>
                {bookings.length === 0 ? (
                    <p className="text-text-light text-center py-8">Belum ada pemesanan bulan ini</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-2 text-sm font-semibold">Tanggal</th>
                                    <th className="text-left py-3 px-2 text-sm font-semibold">Judul</th>
                                    <th className="text-left py-3 px-2 text-sm font-semibold">Ruang</th>
                                    <th className="text-left py-3 px-2 text-sm font-semibold">Pemohon</th>
                                    <th className="text-left py-3 px-2 text-sm font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-2 text-sm">
                                            {format(new Date(booking.startTime), "d MMM yyyy", { locale: id })}
                                        </td>
                                        <td className="py-3 px-2 text-sm font-medium">{booking.title}</td>
                                        <td className="py-3 px-2 text-sm">{booking.room.name}</td>
                                        <td className="py-3 px-2 text-sm">{booking.user.name}</td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                                                booking.status === 'REJECTED' ? 'bg-red-100 text-red-600' :
                                                    'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
