import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";

export default async function NewBookingPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    const rooms = await prisma.room.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Pesan Ruang Meeting</h1>
                <p className="text-text-light mt-1">Isi formulir di bawah untuk memesan ruang meeting</p>
            </div>

            <div className="glass-card p-6">
                <BookingForm rooms={rooms} userId={session.user.id} />
            </div>
        </div>
    );
}
