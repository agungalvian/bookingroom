import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RoomForm from "@/components/RoomForm";

export default async function NewRoomPage() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Tambah Ruang Meeting</h1>
                <p className="text-text-light mt-1">Isi formulir untuk menambah ruang meeting baru</p>
            </div>

            <div className="glass-card p-6">
                <RoomForm />
            </div>
        </div>
    );
}
