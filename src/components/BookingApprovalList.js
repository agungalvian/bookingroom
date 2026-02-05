"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Calendar, Clock, User, MapPin, Edit2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function BookingApprovalList({ bookings, allRooms }) {
    const router = useRouter();
    const [loading, setLoading] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState("");

    const handleApproval = async (bookingId, status, notes = "", newRoomId = null) => {
        setLoading(bookingId);
        try {
            const res = await fetch(`/api/bookings/${bookingId}/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, notes, roomId: newRoomId }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Gagal memproses permintaan");
            }

            setEditingRoom(null);
            router.refresh();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(null);
        }
    };

    const handleReject = (bookingId) => {
        const notes = prompt("Alasan penolakan (opsional):");
        if (notes !== null) {
            handleApproval(bookingId, "REJECTED", notes);
        }
    };

    const handleChangeRoom = (bookingId) => {
        if (!selectedRoom) {
            alert("Pilih ruangan terlebih dahulu");
            return;
        }
        handleApproval(bookingId, "APPROVED", "Ruangan diganti oleh admin", selectedRoom);
    };

    const startEditRoom = (bookingId, currentRoomId) => {
        setEditingRoom(bookingId);
        setSelectedRoom(currentRoomId);
    };

    if (bookings.length === 0) {
        return (
            <div className="glass-card p-12 text-center">
                <p className="text-text-light">Tidak ada pemesanan yang menunggu konfirmasi</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <div key={booking.id} className="glass-card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{booking.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-light">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{booking.user.name} ({booking.user.email})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {editingRoom === booking.id ? (
                                        <select
                                            value={selectedRoom}
                                            onChange={(e) => setSelectedRoom(e.target.value)}
                                            className="px-3 py-1 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            {allRooms.map((room) => (
                                                <option key={room.id} value={room.id}>
                                                    {room.name} (Kapasitas: {room.capacity})
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span>{booking.room.name}</span>
                                    )}
                                    {editingRoom !== booking.id && (
                                        <button
                                            onClick={() => startEditRoom(booking.id, booking.roomId)}
                                            className="ml-2 p-1 hover:bg-blue-50 text-primary rounded transition-colors"
                                            title="Ganti ruangan"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                    )}
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
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        {editingRoom === booking.id ? (
                            <>
                                <button
                                    onClick={() => setEditingRoom(null)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => handleChangeRoom(booking.id)}
                                    disabled={loading === booking.id}
                                    className="flex-1 btn-primary px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                                >
                                    {loading === booking.id ? "Memproses..." : "Setujui dengan Ruangan Baru"}
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleReject(booking.id)}
                                    disabled={loading === booking.id}
                                    className="flex-1 px-4 py-2 rounded-lg border border-red-300 text-red-600 font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <XCircle size={18} />
                                    Tolak
                                </button>
                                <button
                                    onClick={() => handleApproval(booking.id, "APPROVED")}
                                    disabled={loading === booking.id}
                                    className="flex-1 btn-primary px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <CheckCircle size={18} />
                                    {loading === booking.id ? "Memproses..." : "Setujui"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
