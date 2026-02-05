import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
    try {
        const session = await auth();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, username, email, password, role, isLdap } = body;

        // Check if email or username is taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {
                AND: [
                    { NOT: { id } },
                    {
                        OR: [
                            { email },
                            { username: username || undefined }
                        ]
                    }
                ]
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email atau Username sudah digunakan oleh user lain" },
                { status: 400 }
            );
        }

        // Prepare update data
        const updateData = {
            name,
            username: username || null,
            email,
            role,
            isLdap: isLdap || false,
        };

        // Only update password if provided
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("User update error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await auth();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        // Prevent deleting yourself
        if (id === session.user.id) {
            return NextResponse.json(
                { message: "Tidak dapat menghapus akun Anda sendiri" },
                { status: 400 }
            );
        }

        // Check if user has bookings
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { bookings: true },
                },
            },
        });

        if (user._count.bookings > 0) {
            return NextResponse.json(
                { message: `User memiliki ${user._count.bookings} pemesanan. Hapus pemesanan terlebih dahulu.` },
                { status: 400 }
            );
        }

        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("User deletion error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
