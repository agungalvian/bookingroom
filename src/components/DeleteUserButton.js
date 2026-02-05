"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteUserButton({ userId, userEmail }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Apakah Anda yakin ingin menghapus user ${userEmail}?`)) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Gagal menghapus user");
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
            title="Hapus user"
        >
            <Trash2 size={18} />
        </button>
    );
}
