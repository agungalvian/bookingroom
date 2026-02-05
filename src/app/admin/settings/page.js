import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SettingsForm from "@/components/SettingsForm";

export default async function AdminSettingsPage() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/");
    }

    const settings = await prisma.setting.findMany();
    const settingsMap = Object.fromEntries(
        settings.map((s) => [s.key, s.value])
    );

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary">Pengaturan Sistem</h1>
                <p className="text-text-light mt-1">Konfigurasi LDAP dan pengaturan aplikasi</p>
            </div>

            <SettingsForm settings={settingsMap} />
        </div>
    );
}
