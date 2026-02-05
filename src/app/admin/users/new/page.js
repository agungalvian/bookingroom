import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserForm from "@/components/UserForm";

export default async function NewUserPage() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Tambah User Baru</h1>
                <p className="text-text-light mt-1">Buat akun pengguna baru untuk aplikasi</p>
            </div>

            <div className="glass-card p-6">
                <UserForm />
            </div>
        </div>
    );
}
