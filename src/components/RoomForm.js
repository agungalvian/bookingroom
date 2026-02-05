"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, FileText, Plus, X } from "lucide-react";

export default function RoomForm({ room = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [facilities, setFacilities] = useState(room?.facilities || []);
    const [newFacility, setNewFacility] = useState("");

    const addFacility = () => {
        if (newFacility.trim() && !facilities.includes(newFacility.trim())) {
            setFacilities([...facilities, newFacility.trim()]);
            setNewFacility("");
        }
    };

    const removeFacility = (facility) => {
        setFacilities(facilities.filter((f) => f !== facility));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            capacity: parseInt(formData.get("capacity")),
            facilities,
        };

        try {
            const url = room ? `/api/rooms/${room.id}` : "/api/rooms";
            const method = room ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Gagal menyimpan ruang");
            }

            router.push("/admin/rooms");
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                    <FileText size={18} />
                    Nama Ruang
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    defaultValue={room?.name}
                    placeholder="Contoh: Ruang Rapat Utama"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                    Deskripsi
                </label>
                <textarea
                    name="description"
                    rows={3}
                    defaultValue={room?.description}
                    placeholder="Lokasi, keterangan tambahan, dll."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                    <Users size={18} />
                    Kapasitas (orang)
                </label>
                <input
                    type="number"
                    name="capacity"
                    required
                    min="1"
                    defaultValue={room?.capacity}
                    placeholder="10"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                    Fasilitas
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newFacility}
                        onChange={(e) => setNewFacility(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFacility())}
                        placeholder="Tambah fasilitas (Projector, Whiteboard, dll.)"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                        type="button"
                        onClick={addFacility}
                        className="btn-primary px-4 py-3 rounded-lg"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {facilities.map((facility) => (
                        <span
                            key={facility}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-2"
                        >
                            {facility}
                            <button
                                type="button"
                                onClick={() => removeFacility(facility)}
                                className="hover:text-red-500"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Menyimpan..." : room ? "Update Ruang" : "Tambah Ruang"}
                </button>
            </div>
        </form>
    );
}
