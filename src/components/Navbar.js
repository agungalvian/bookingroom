"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Calendar, Home, Settings, PieChart, Users, CheckCircle, ClipboardList, Menu, X } from "lucide-react";

export default function Navbar({ user, signOutAction }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="glass-card sticky top-4 mx-4 my-2 z-50 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Logo and Brand */}
                <div className="flex items-center gap-8">
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                            <Home size={18} /> Dashboard
                        </Link>
                        <Link href="/calendar" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                            <Calendar size={18} /> Kalendar
                        </Link>
                        {user.role === 'ADMIN' && (
                            <>
                                <Link href="/admin" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                                    <CheckCircle size={18} /> Konfirmasi
                                </Link>
                                <Link href="/admin/bookings" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                                    <ClipboardList size={18} /> Pemesanan
                                </Link>
                                <Link href="/admin/users" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                                    <Users size={18} /> Users
                                </Link>
                                <Link href="/admin/rooms" className="flex items-center gap-2 text-text-dark hover:text-primary transition-colors">
                                    <Users size={18} /> Ruangan
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

                {/* User Info & Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-text-light">{user.role}</p>
                    </div>
                    <form action={signOutAction}>
                        <button className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors" title="Sign Out">
                            <LogOut size={20} />
                        </button>
                    </form>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="p-2 text-text-dark hover:text-primary transition-colors">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                    {/* Mobile User Info */}
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">{user.name}</span>
                            <span className="text-xs text-text-light">{user.role}</span>
                        </div>
                        <form action={signOutAction}>
                            <button className="flex items-center gap-2 text-xs font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors">
                                Sign Out <LogOut size={14} />
                            </button>
                        </form>
                    </div>

                    {/* Mobile Links */}
                    <nav className="flex flex-col gap-3">
                        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                            <Home size={20} /> Dashboard
                        </Link>
                        <Link href="/calendar" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                            <Calendar size={20} /> Kalendar
                        </Link>
                        {user.role === 'ADMIN' && (
                            <>
                                <Link href="/admin" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                                    <CheckCircle size={20} /> Konfirmasi
                                </Link>
                                <Link href="/admin/bookings" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                                    <ClipboardList size={20} /> Pemesanan
                                </Link>
                                <Link href="/admin/users" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                                    <Users size={20} /> Users
                                </Link>
                                <Link href="/admin/rooms" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                                    <Users size={20} /> Ruangan
                                </Link>
                                <Link href="/admin/reports" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                                    <PieChart size={20} /> Laporan
                                </Link>
                                <Link href="/admin/settings" onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 text-text-dark hover:text-primary transition-colors">
                                    <Settings size={20} /> Pengaturan
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </nav>
    );
}
