import "./globals.css";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { LogOut, Calendar, Home, Settings, PieChart, Users, CheckCircle, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Pemesanan Ruang Meeting BP TAPERA",
  description: "Internal Meeting Room Booking System",
};

import DevToolsBlocker from "@/components/DevToolsBlocker";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <DevToolsBlocker />
        {session && (
          <nav className="glass-card sticky top-4 mx-4 my-2 z-50 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/logo-bptapera.svg"
                  alt="BP TAPERA Logo"
                  className="w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">BP TAPERA</span>
                  <span className="text-xs text-text-light">Meeting Room Booking</span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="/" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                  <Home size={18} /> Dashboard
                </Link>
                <Link href="/calendar" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                  <Calendar size={18} /> Kalendar
                </Link>
                {session.user.role === 'ADMIN' && (
                  <>
                    <Link href="/admin" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                      <CheckCircle size={18} /> Konfirmasi
                    </Link>
                    <Link href="/admin/bookings" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                      <ClipboardList size={18} /> Pemesanan
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                      <Users size={18} /> Manajemen User
                    </Link>
                    <Link href="/admin/rooms" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                      <Users size={18} /> Ruang Meeting
                    </Link>
                    <Link href="/admin/reports" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                      <PieChart size={18} /> Laporan
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                      <Settings size={18} /> Pengaturan
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{session.user.name}</p>
                <p className="text-xs text-text-light">{session.user.role}</p>
              </div>
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <button className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors">
                  <LogOut size={20} />
                </button>
              </form>
            </div>
          </nav>
        )}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full fade-in">
          {children}
        </main>
      </body>
    </html>
  );
}
