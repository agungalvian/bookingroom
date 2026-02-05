"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Server, Lock, User, AlertCircle } from "lucide-react";

export default function SettingsForm({ settings }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData(e.target);
        const data = {
            ldap_enabled: formData.get("ldap_enabled") === "on",
            ldap_url: formData.get("ldap_url"),
            ldap_bind_dn: formData.get("ldap_bind_dn"),
            ldap_bind_password: formData.get("ldap_bind_password"),
            ldap_base_dn: formData.get("ldap_base_dn"),
        };

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Gagal menyimpan pengaturan");
            }

            setSuccess(true);
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Server size={24} className="text-primary" />
                    Integrasi LDAP
                </h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
                        Pengaturan berhasil disimpan!
                    </div>
                )}

                <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="ldap_enabled"
                            defaultChecked={settings.ldap_enabled === "true"}
                            className="w-5 h-5 text-primary focus:ring-primary rounded"
                        />
                        <span className="font-medium">Aktifkan LDAP</span>
                    </label>
                    <p className="text-sm text-text-light mt-1 ml-7">
                        Izinkan pengguna untuk login menggunakan kredensial LDAP
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                            <Server size={16} />
                            LDAP URL
                        </label>
                        <input
                            type="text"
                            name="ldap_url"
                            defaultValue={settings.ldap_url || ""}
                            placeholder="ldap://localhost:389"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                            <User size={16} />
                            Bind DN
                        </label>
                        <input
                            type="text"
                            name="ldap_bind_dn"
                            defaultValue={settings.ldap_bind_dn || ""}
                            placeholder="cn=admin,dc=example,dc=org"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                            <Lock size={16} />
                            Bind Password
                        </label>
                        <input
                            type="password"
                            name="ldap_bind_password"
                            defaultValue={settings.ldap_bind_password || ""}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                            Base DN
                        </label>
                        <input
                            type="text"
                            name="ldap_base_dn"
                            defaultValue={settings.ldap_base_dn || ""}
                            placeholder="dc=example,dc=org"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                    <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                    <div className="text-sm text-yellow-800">
                        <p className="font-semibold mb-1">Catatan Penting:</p>
                        <p>Pastikan server LDAP dapat diakses dari aplikasi ini. Konfigurasi yang salah dapat menyebabkan kegagalan autentikasi.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Menyimpan..." : "Simpan Pengaturan"}
                </button>
            </div>
        </form>
    );
}
