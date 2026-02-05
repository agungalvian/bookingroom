"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteRoomButton({ roomId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Apakah Anda yakin ingin menghapus ruang ini?")) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/rooms/${roomId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Gagal menghapus ruang");
            }

            router.refresh();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors disabled:opacity-50"
        >
            <Trash2 size={18} />
        </button>
    );
}
