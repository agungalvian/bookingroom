import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import UserForm from "@/components/UserForm";

export default async function EditUserPage({ params }) {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    const { id } = await params;
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Edit User</h1>
                <p className="text-text-light mt-1">Update informasi pengguna</p>
            </div>

            <div className="glass-card p-6">
                <UserForm user={user} />
            </div>
        </div>
    );
}
