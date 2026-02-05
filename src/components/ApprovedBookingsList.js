"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Calendar, Clock, User, MapPin } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function ApprovedBookingsList({ bookings }) {
    const router = useRouter();
    const [loading, setLoading] = useState(null);

    const handleCancel = async (bookingId, title) => {
        if (!confirm(`Apakah Anda yakin ingin membatalkan pemesanan "${title}"?`)) {
            return;
        }

        setLoading(bookingId);
        try {
            const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
                method: "POST",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Gagal membatalkan pemesanan");
            }

            router.refresh();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(null);
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="glass-card p-12 text-center">
                <p className="text-text-light">Tidak ada pemesanan yang disetujui</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <div key={booking.id} className="glass-card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold">{booking.title}</h3>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                    APPROVED
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-light">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{booking.user.name} ({booking.user.email})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{booking.room.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{format(new Date(booking.startTime), "EEEE, d MMMM yyyy", { locale: id })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>
                                        {format(new Date(booking.startTime), "HH:mm")} - {format(new Date(booking.endTime), "HH:mm")}
                                    </span>
                                </div>
                            </div>
                            {booking.description && (
                                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm text-text-dark">{booking.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="ml-4">
                            <button
                                onClick={() => handleCancel(booking.id, booking.title)}
                                disabled={loading === booking.id}
                                className="px-4 py-2 rounded-lg border border-red-300 text-red-600 font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                <XCircle size={18} />
                                {loading === booking.id ? "Membatalkan..." : "Batalkan"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
