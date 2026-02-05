import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Shield, User as UserIcon } from "lucide-react";
import DeleteUserButton from "@/components/DeleteUserButton";

export default async function AdminUsersPage() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    const users = await prisma.user.findMany({
        include: {
            _count: {
                select: { bookings: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Manajemen User</h1>
                    <p className="text-text-light mt-1">Kelola pengguna aplikasi</p>
                </div>
                <Link
                    href="/admin/users/new"
                    className="btn-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                >
                    <Plus size={20} />
                    Tambah User
                </Link>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-text-dark">Nama</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-text-dark">Username</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-text-dark">Email</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-text-dark">Role</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-text-dark">Tipe</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-text-dark">Pemesanan</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-text-dark">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                            <span className="font-medium">{user.name || 'No Name'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-text-light font-mono">
                                        {user.username || '-'}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-text-light">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN'
                                            ? 'bg-purple-100 text-purple-600'
                                            : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isLdap
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {user.isLdap ? 'LDAP' : 'Internal'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-text-light">
                                        {user._count.bookings} pemesanan
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="p-2 hover:bg-blue-50 text-primary rounded-lg transition-colors"
                                                title="Edit user"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteUserButton userId={user.id} userEmail={user.email} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="p-12 text-center text-text-light">
                        Belum ada user. Tambahkan user pertama Anda!
                    </div>
                )}
            </div>
        </div>
    );
}
