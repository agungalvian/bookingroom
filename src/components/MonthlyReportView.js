"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Printer, Calendar, TrendingUp, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthlyReportView({ data, currentMonth, currentYear }) {
    const router = useRouter();
    const [printDate, setPrintDate] = useState(null);

    useEffect(() => {
        setPrintDate(new Date());
    }, []);

    const handlePrint = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 100);
    };

    const handleMonthChange = (monthDelta) => {
        const newDate = new Date(currentYear, currentMonth + monthDelta, 1);
        const newMonth = newDate.getMonth();
        const newYear = newDate.getFullYear();
        router.push(`/admin/reports/monthly?month=${newMonth}&year=${newYear}`);
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        router.push(`/admin/reports/monthly?month=${currentMonth}&year=${newYear}`);
    };

    const handleMonthSelect = (e) => {
        const newMonth = parseInt(e.target.value);
        router.push(`/admin/reports/monthly?month=${newMonth}&year=${currentYear}`);
    };

    // Generate year options (current year ± 5 years)
    const currentYearNow = new Date().getFullYear();
    const yearOptions = [];
    for (let i = currentYearNow - 5; i <= currentYearNow + 1; i++) {
        yearOptions.push(i);
    }

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return (
        <div>
            {/* Action buttons and filters - hidden when printing */}
            <div className="mb-6 no-print">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Laporan Bulanan</h1>
                        <p className="text-text-light mt-1">Laporan pemesanan ruang meeting bulan {data.month}</p>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="btn-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                    >
                        <Printer size={20} />
                        Cetak / PDF
                    </button>
                </div>

                {/* Month/Year Filter */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleMonthChange(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Bulan sebelumnya"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex gap-3 flex-1 justify-center">
                            <div className="flex flex-col">
                                <label className="text-xs text-text-light mb-1">Bulan</label>
                                <select
                                    value={currentMonth}
                                    onChange={handleMonthSelect}
                                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                >
                                    {monthNames.map((name, idx) => (
                                        <option key={idx} value={idx}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs text-text-light mb-1">Tahun</label>
                                <select
                                    value={currentYear}
                                    onChange={handleYearChange}
                                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                >
                                    {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={() => handleMonthChange(1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Bulan berikutnya"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Printable content */}
            <div className="print-container">
                {/* Header for print */}
                <div className="print-header">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <img src="/logo-bptapera-full.png" alt="BP TAPERA" className="w-16 h-16" />
                            <div>
                                <h1 className="text-2xl font-bold text-primary">BP TAPERA</h1>
                                <p className="text-sm text-text-light">Badan Pengelola Tabungan Perumahan Rakyat</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-text-light">Tanggal Cetak:</p>
                            <p className="font-semibold">
                                {printDate ? format(printDate, 'd MMMM yyyy', { locale: id }) : '-'}
                            </p>
                        </div>
                    </div>

                    <div className="text-center mb-8 pb-4 border-b-2 border-primary">
                        <h2 className="text-xl font-bold">LAPORAN PEMESANAN RUANG MEETING</h2>
                        <p className="text-lg mt-1">Periode: {data.month}</p>
                    </div>
                </div>

                {/* Statistics Summary */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary" />
                        Ringkasan Statistik
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="stat-card">
                            <p className="text-sm text-text-light">Total Pemesanan</p>
                            <p className="text-3xl font-bold text-primary">{data.stats.total}</p>
                        </div>
                        <div className="stat-card">
                            <p className="text-sm text-text-light">Disetujui</p>
                            <p className="text-3xl font-bold text-green-600">{data.stats.approved}</p>
                        </div>
                        <div className="stat-card">
                            <p className="text-sm text-text-light">Ditolak</p>
                            <p className="text-3xl font-bold text-red-600">{data.stats.rejected}</p>
                        </div>
                        <div className="stat-card">
                            <p className="text-sm text-text-light">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{data.stats.pending}</p>
                        </div>
                        <div className="stat-card">
                            <p className="text-sm text-text-light">Dibatalkan</p>
                            <p className="text-3xl font-bold text-gray-600">{data.stats.cancelled}</p>
                        </div>
                    </div>
                </div>

                {/* Room Usage */}
                <div className="mb-8 page-break-before">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-primary" />
                        Penggunaan Ruang Meeting
                    </h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Ruangan</th>
                                <th>Kapasitas</th>
                                <th>Jumlah Pemesanan</th>
                                <th>Total Jam Penggunaan</th>
                                <th>Persentase</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.roomStats.map((room, idx) => {
                                const percentage = data.stats.approved > 0
                                    ? ((room.bookingCount / data.stats.approved) * 100).toFixed(1)
                                    : 0;
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td className="font-medium">{room.name}</td>
                                        <td>{room.capacity} orang</td>
                                        <td>{room.bookingCount}</td>
                                        <td>{room.totalHours.toFixed(1)} jam</td>
                                        <td>{percentage}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Top Users */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Users size={20} className="text-primary" />
                        10 Pengguna Teratas
                    </h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Jumlah Pemesanan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.topUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td className="font-medium">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.bookingCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detailed Bookings */}
                <div className="mb-8 page-break-before">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-primary" />
                        Detail Pemesanan
                    </h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Waktu</th>
                                <th>Judul</th>
                                <th>Ruangan</th>
                                <th>Pemohon</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.bookings.map((booking, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{format(new Date(booking.startTime), 'd MMM yyyy', { locale: id })}</td>
                                    <td>
                                        {format(new Date(booking.startTime), 'HH:mm')} -
                                        {format(new Date(booking.endTime), 'HH:mm')}
                                    </td>
                                    <td className="font-medium">{booking.title}</td>
                                    <td>{booking.room.name}</td>
                                    <td>{booking.user.name}</td>
                                    <td>
                                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer for print */}
                <div className="print-footer">
                    <div className="text-center text-sm text-text-light border-t pt-4 mt-8">
                        <p>Dokumen ini dicetak dari Sistem Pemesanan Ruang Meeting BP TAPERA</p>
                        <p>Dicetak pada: {printDate ? format(printDate, 'd MMMM yyyy HH:mm', { locale: id }) : '-'}</p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-container {
            padding: 20px;
          }
          
          .page-break-before {
            page-break-before: always;
          }
          
          body {
            background: white !important;
          }
          
          .glass-card {
            background: white !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
        
        .stat-card {
          padding: 1rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          text-align: center;
        }
        
        .report-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }
        
        .report-table th {
          background: #f3f4f6;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .report-table td {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          font-size: 13px;
        }
        
        .report-table tbody tr:hover {
          background: #f9fafb;
        }
        
        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .status-badge.approved {
          background: #dcfce7;
          color: #166534;
        }
        
        .status-badge.rejected {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .status-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }
        
        .status-badge.cancelled {
          background: #f3f4f6;
          color: #4b5563;
        }
        
        @media print {
          .report-table {
            font-size: 11px;
          }
          
          .report-table th,
          .report-table td {
            padding: 8px;
          }
        }
      `}</style>
        </div>
    );
}
