/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Bell, 
  LogOut, 
  Search, 
  CheckCircle, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  Check, 
  Sparkles, 
  Activity,
  FileCheck2,
  CalendarCheck2,
  PieChart,
  User,
  ExternalLink,
  CornerDownRight,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceDetail, SystemNotification, PerformanceMetric } from "../types";
import { SERVICES_DATA, MOCK_USER, INITIAL_NOTIFICATIONS, MOCK_PERFORMANCE_DATA } from "../data/services";
import QuickPreviewModal from "./QuickPreviewModal";

interface DashboardScreenProps {
  onLogout: () => void;
}

export default function DashboardScreen({ onLogout }: DashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [chartMetric, setChartMetric] = useState<"performance" | "attendance" | "budget">("performance");
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"semua" | "administrasi" | "perencanaan">("semua");

  // Filter 6 services based on search text and active categorization tabs
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((srv) => {
      const matchSearch = srv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.badge.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchSearch) return false;
      
      if (activeTab === "administrasi") {
        return ["aparatur-negara", "kearsipan-nasional", "keuangan-negara"].includes(srv.id);
      }
      if (activeTab === "perencanaan") {
        return ["pengadaan-barang", "pemerintah-daerah", "perencanaan-pembangunan"].includes(srv.id);
      }
      return true;
    });
  }, [searchQuery, activeTab]);

  // Counting unread notifications
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const toggleReadNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Quick Action triggers matching the notification alert to open relevant service preview modal
  const handleNotifAction = (serviceId: string) => {
    const service = SERVICES_DATA.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setShowNotifDropdown(false);
    }
  };

  // Pre-calculated stats based on multiple systems
  const pendingActionsCount = useMemo(() => {
    return notifications.filter(n => n.category === "Tindakan").length;
  }, [notifications]);

  // Integrated performance chart helpers
  const maxDocValue = useMemo(() => {
    return Math.max(...MOCK_PERFORMANCE_DATA.map(d => Math.max(d.dokumenSelesai, d.skpTarget))) + 5;
  }, []);

  return (
    <div id="dashboard-layout" className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 flex flex-col">
      
      {/* Upper Red-White Ribbon - Indonesia Flag Theme */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#e1251b] via-[#ef4444] to-slate-200 shrink-0"></div>

      {/* Main Header / Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#0c1424] text-white border-b border-slate-800 px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Identity left */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#e1251b] to-[#f04438] text-white font-extrabold flex items-center justify-center text-xs tracking-wider shadow-md shadow-red-500/10 transition-transform duration-300 hover:scale-105">
              INA
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-red-400 tracking-wider font-sans">INA DIGITAL</span>
                <span className="text-[9px] bg-slate-800 text-slate-300 font-bold px-1.5 py-0.2 rounded border border-slate-700 uppercase tracking-widest">
                  SPBE
                </span>
              </div>
              <h1 className="text-sm font-extrabold text-white -mt-0.5 tracking-tight hidden sm:block">
                Portal Administrasi Pemerintahan
              </h1>
              <h1 className="text-sm font-extrabold text-white -mt-0.5 tracking-tight sm:hidden">
                Portal Layanan ASN
              </h1>
            </div>
          </div>

          {/* Quick Controls Right */}
          <div className="flex items-center gap-4">
            
            {/* Integrated Notification Bell button with Drawer dropdown trigger */}
            <div className="relative">
              <button
                id="btn-notif-bell"
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-all relative focus:outline-none cursor-pointer"
                aria-label="Notifikasi"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white font-sans text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Overlay Dropdown */}
              <AnimatePresence>
                {showNotifDropdown && (
                  <>
                    {/* Click backdrop close overlay */}
                    <div className="fixed inset-0 z-30" onClick={() => setShowNotifDropdown(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl z-40 overflow-hidden text-sm"
                    >
                      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <span>Notifikasi Layanan Terintegrasi</span>
                          <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded-full font-mono">
                            {unreadCount} Baru
                          </span>
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-700 font-semibold hover:underline"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                            <CheckCircle size={24} className="mx-auto text-slate-350" />
                            <p>Bersih semua! Tidak ada notifikasi yang ditangguhkan.</p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              onClick={() => handleNotifAction(notif.serviceId)}
                              className={`p-3.5 hover:bg-blue-50/40 transition-colors cursor-pointer flex gap-2.5 ${
                                !notif.isRead ? "bg-blue-50/15" : ""
                              }`}
                            >
                              {/* Indicator Icon */}
                              <div className="mt-0.5 shrink-0">
                                {notif.category === "Tindakan" ? (
                                  <span className="h-2 w-2 rounded-full bg-amber-500 block animate-ping" />
                                ) : notif.category === "Penting" ? (
                                  <span className="h-2 w-2 rounded-full bg-red-600 block" />
                                ) : (
                                  <span className="h-2 w-2 rounded-full bg-blue-500 block" />
                                )}
                              </div>

                              <div className="space-y-1 flex-1">
                                <div className="flex justify-between items-start gap-2">
                                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                                    {notif.serviceName}
                                  </p>
                                  <span className="text-[9px] text-slate-450 shrink-0 font-mono italic">
                                    {notif.timestamp}
                                  </span>
                                </div>
                                <h4 className={`text-xs ${!notif.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>
                                  {notif.title}
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  {notif.message}
                                </p>
                                
                                <div className="pt-2 flex justify-between items-center">
                                  <span className="text-[9px] text-blue-700 hover:underline flex items-center gap-0.5">
                                    Buka Pratinjau Kerja <ChevronRight size={10} />
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => toggleReadNotification(notif.id, e)}
                                      title={notif.isRead ? "Tandai Belum Dibaca" : "Tandai Dibaca"}
                                      className="p-1 text-slate-450 hover:text-slate-700 rounded hover:bg-slate-100"
                                    >
                                      {notif.isRead ? "Belum Dibaca" : "Tandai Dibaca"}
                                    </button>
                                    <button
                                      onClick={(e) => deleteNotification(notif.id, e)}
                                      className="p-1 text-red-400 hover:text-red-700 rounded hover:bg-red-50 text-[10px]"
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
                        Disinkronkan dengan SPBE Pusat RI pada 11:40 WITA
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Session Quick Profile info */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-white/95 leading-tight">
                  {MOCK_USER.name}
                </p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                  {MOCK_USER.jabatan}
                </p>
              </div>
              <img 
                src={MOCK_USER.avatarUrl} 
                alt="Foto Profil ASN" 
                referrerPolicy="no-referrer"
                className="h-8.5 w-8.5 rounded-full object-cover border border-slate-700 shadow-sm"
              />
              <button
                id="btn-logout"
                onClick={onLogout}
                title="Keluar SSO"
                className="p-2 text-slate-350 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 rounded-full transition-all cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Welcome Section & Quick Stats summary banner */}
        <section className="bg-gradient-to-r from-[#0b172d] to-[#070f1e] p-6 sm:p-8 rounded-2xl text-white relative overflow-hidden shadow-xl border border-slate-800/60">
          {/* Subtle Decorative Background Lines - INA Digital Blue Spotlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0052ff]/15 rounded-full filter blur-[100px] -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ef4444]/5 rounded-full filter blur-[100px] -ml-16 -mb-16 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#0052ff]/10 border border-[#0052ff]/25 px-3 py-1 rounded-full text-xs font-bold text-[#4c84ff]">
                <Sparkles size={13} className="text-[#4b83ff] animate-pulse" />
                <span>Koneksi Portal: <strong className="text-white">SSO Valid / Aktif</strong></span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                Selamat Datang Kembali, {MOCK_USER.name}
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm font-medium leading-relaxed">
                NIP: <span className="font-mono text-white font-semibold">{MOCK_USER.nip}</span> • {MOCK_USER.instansi} • Golongan: {MOCK_USER.golongan}. 
                Sistem terotentikasi otomatis dengan server BKN & Kementerian PANRB.
              </p>
            </div>

            {/* Quick Metrics Cards Inside Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] rounded-xl shadow-inner">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Tindakan Menunggu</span>
                <span className="text-xl font-extrabold text-amber-400 font-sans">{pendingActionsCount} Tugas</span>
                <span className="text-[9px] text-slate-450 block mt-1">Butuh otorisasi segera</span>
              </div>
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] rounded-xl shadow-inner">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Nilai Kinerja SKP</span>
                <span className="text-xl font-extrabold text-emerald-400 font-sans">Sangat Baik</span>
                <span className="text-[9px] text-slate-450 block mt-1">Skor IKP: 94.8</span>
              </div>
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] rounded-xl col-span-2 sm:col-span-1 shadow-inner">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Sesi Terkoneksi</span>
                <span className="text-xl font-extrabold text-[#0052ff] font-sans">6 Sistem</span>
                <span className="text-[9px] text-slate-450 block mt-1">Akses Tanpa Sandi</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Telemetry Metric Summary Widget Rows */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-[#0052ff] rounded-xl shadow-xs">
              <FileCheck2 size={22} className="text-[#0052ff]" />
            </div>
            <div>
              <span className="text-[10px] text-slate-450 font-extrabold block uppercase tracking-widest">Kearsipan (SRIKANDI)</span>
              <span className="text-lg font-bold text-slate-900 tracking-tight">4 Surat Masuk</span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1 font-sans font-medium">
                <Clock size={11} className="text-[#0052ff]" /> 1 TTE Mendesak
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shadow-xs">
              <CalendarCheck2 size={22} />
            </div>
            <div>
              <span className="text-[10px] text-slate-450 font-extrabold block uppercase tracking-widest">Aparatur (e-Kinerja)</span>
              <span className="text-lg font-bold text-slate-900 tracking-tight">2 Verifikasi SKP</span>
              <span className="text-[10px] text-slate-500 block mt-1 font-sans font-medium">✓ Penyelesaian SKP: 94.8%</span>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shadow-xs">
              <PieChart size={22} />
            </div>
            <div>
              <span className="text-[10px] text-slate-450 font-extrabold block uppercase tracking-widest">Pagu Fiskal (SAKTI)</span>
              <span className="text-lg font-bold text-slate-900 tracking-tight">Realisasi 42.8%</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-1 font-sans">✓ Sesuai Target TW II</span>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shadow-xs">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="text-[10px] text-slate-450 font-extrabold block uppercase tracking-widest">Komitmen LKPP</span>
              <span className="text-lg font-bold text-slate-900 tracking-tight">3 Paket Aktif</span>
              <span className="text-[10px] text-slate-500 block mt-1 font-sans font-medium">2 Tender, 1 Kontrak</span>
            </div>
          </div>
        </section>

        {/* Middle Section: Integrated Interactive Statistical Charts */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Grafik Pemantauan Kinerja & Disiplin ASN (2026)
                </h3>
                <p className="text-xs text-slate-400">
                  Memonitoring produktivitas penyelesaian administrasi dan tingkat presensi kerja Anda.
                </p>
              </div>

              {/* Chart selector tabs buttons */}
              <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
                <button
                  onClick={() => setChartMetric("performance")}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    chartMetric === "performance" ? "bg-white text-blue-900 shadow-sm" : "text-slate-505 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Penyelesaian SKP
                </button>
                <button
                  onClick={() => setChartMetric("attendance")}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    chartMetric === "attendance" ? "bg-white text-blue-900 shadow-sm" : "text-slate-505 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Tingkat Disiplin
                </button>
              </div>
            </div>

            {/* Custom High-Fidelity SVG Responsive Chart Container */}
            <div className="h-64 relative bg-slate-50 rounded-xl p-4 border border-slate-150/70 select-none flex flex-col justify-between">
              
              {chartMetric === "performance" ? (
                <>
                  {/* Legend */}
                  <div className="flex gap-4 justify-end text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs block"></span> Dokumen Selesai
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs block"></span> Target SKP Bulanan
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="flex-1 relative flex items-end justify-between px-2 pt-4">
                    
                    {/* SVG grid lines background decoration */}
                    <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointers-none text-[8px] text-slate-350">
                      <div className="w-full border-t border-slate-200/50 pt-1">40 Dokumen</div>
                      <div className="w-full border-t border-slate-200/50 pt-1">30 Dokumen</div>
                      <div className="w-full border-t border-slate-200/50 pt-1">20 Dokumen</div>
                      <div className="w-full border-t border-slate-200/50 pt-1">10 Dokumen</div>
                      <div className="w-full border-b border-slate-300"></div>
                    </div>

                    {/* Bars rendering */}
                    {MOCK_PERFORMANCE_DATA.map((entry, idx) => {
                      const completeHeight = (entry.dokumenSelesai / maxDocValue) * 100;
                      const targetHeight = (entry.skpTarget / maxDocValue) * 100;
                      const isHovered = hoveredDataPoint === idx;

                      return (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center flex-1 relative group z-10"
                          onMouseEnter={() => setHoveredDataPoint(idx)}
                          onMouseLeave={() => setHoveredDataPoint(null)}
                        >
                          <div className="flex items-end gap-2 h-44 w-full justify-center">
                            
                            {/* Bar 1: Dokumen Selesai */}
                            <div 
                              className={`w-3.5 sm:w-4.5 rounded-t bg-blue-600 group-hover:bg-blue-500 transition-all ${
                                isHovered ? "ring-2 ring-blue-400 ring-offset-1" : ""
                              }`}
                              style={{ height: `${completeHeight}%` }}
                            />

                            {/* Bar 2: Target SKP */}
                            <div 
                              className={`w-3.5 sm:w-4.5 rounded-t bg-amber-400 group-hover:bg-amber-300 transition-all ${
                                isHovered ? "ring-2 ring-amber-300 ring-offset-1" : ""
                              }`}
                              style={{ height: `${targetHeight}%` }}
                            />

                          </div>

                          <span className="text-[10px] font-bold text-slate-500 mt-2 font-sans">
                            {entry.month}
                          </span>

                          {/* Dynamic Tooltip on Hover */}
                          {isHovered && (
                            <div className="absolute bottom-20 bg-slate-900 text-white rounded-lg p-2.5 shadow-xl text-[10px] min-w-[124px] pointer-events-none z-20 font-sans border border-slate-700">
                              <p className="font-bold border-b border-slate-700 pb-1 mb-1">{entry.month} 2026</p>
                              <p className="text-blue-300">✓ Dokumen Selesai: <strong>{entry.dokumenSelesai}</strong></p>
                              <p className="text-amber-300">🎯 Target SKP: <strong>{entry.skpTarget}</strong></p>
                              <p className="text-slate-400 mt-1 whitespace-nowrap">Efisiensi: <strong className="text-white">{Math.round((entry.dokumenSelesai / entry.skpTarget) * 100)}%</strong></p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* Attendance discipline */}
                  <div className="flex gap-4 justify-end text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full block animate-pulse"></span> Persentase Kehadiran Mandiri (%)
                    </span>
                  </div>

                  <div className="flex-1 relative flex items-end justify-between px-2 pt-4">
                    
                    {/* SVG grid lines */}
                    <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointers-none text-[8px] text-slate-350">
                      <div className="w-full border-t border-slate-200/50 pt-1">100% Kehadiran</div>
                      <div className="w-full border-t border-slate-200/50 pt-1">98% Kehadiran</div>
                      <div className="w-full border-t border-slate-200/50 pt-1">96% Kehadiran</div>
                      <div className="w-full border-b border-slate-300"></div>
                    </div>

                    {MOCK_PERFORMANCE_DATA.map((entry, idx) => {
                      // Height normalized to showcase subtle changes in attendance percentage
                      const heightPercent = entry.kehadiranPercent >= 90 
                        ? ((entry.kehadiranPercent - 90) / 10) * 100 
                        : 20;
                      const isHovered = hoveredDataPoint === idx;

                      return (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center flex-1 relative group z-10"
                          onMouseEnter={() => setHoveredDataPoint(idx)}
                          onMouseLeave={() => setHoveredDataPoint(null)}
                        >
                          <div className="flex items-end justify-center h-44 w-full">
                            <div 
                              className={`w-7 sm:w-10 rounded-t bg-emerald-600 group-hover:bg-emerald-500 transition-all flex items-center justify-center text-[10px] font-bold text-white ${
                                isHovered ? "ring-2 ring-emerald-400 shadow-lg" : ""
                              }`}
                              style={{ height: `${Math.max(heightPercent, 15)}%` }}
                            >
                              <span className="text-[9px] mb-1">{entry.kehadiranPercent}%</span>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-slate-500 mt-2 font-sans">
                            {entry.month}
                          </span>

                          {isHovered && (
                            <div className="absolute bottom-20 bg-slate-900 text-white rounded-lg p-2.5 shadow-xl text-[10px] min-w-[120px] pointer-events-none z-20 font-sans border border-slate-700">
                              <p className="font-bold border-b border-slate-700 pb-1 mb-1">{entry.month} Kehadiran</p>
                              <p className="text-emerald-300">⏱ Persentase: <strong>{entry.kehadiranPercent}%</strong></p>
                              <p className="text-slate-400 mt-1">Status Disiplin: <strong className="text-white">{entry.kehadiranPercent === 100 ? "Sempurna" : "Sangat Disiplin"}</strong></p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right sidebar inside chart pane: ASN Tasklist / Instructions Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold text-sm uppercase">
                <CheckCircle size={16} />
                <span>Rencana Kerja Hari Ini</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Silakan tuntaskan tugas kedinasan yang memerlukan otorisasi digital langsung di bawah:
              </p>

              {/* Checkboxes tasks */}
              <div className="space-y-2.5 text-xs">
                <div className="flex gap-2.5 items-start p-2 bg-white rounded border border-slate-200/80">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-350" defaultChecked={false} />
                  <div>
                    <span className="font-semibold text-slate-800">TTE Nota Dinas Evaluasi TI</span>
                    <span className="block text-[9px] text-red-600 font-medium">SRIKANDI • Mendesak</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start p-2 bg-white rounded border border-slate-200/80">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-350" defaultChecked={false} />
                  <div>
                    <span className="font-semibold text-slate-800">Verifikasi SKP Surtinah & Bambang</span>
                    <span className="block text-[9px] text-amber-600 font-medium font-sans">e-Kinerja • Batas: Besok</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start p-2 bg-white rounded border border-slate-200/80 opacity-60 line-through">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-350" defaultChecked={true} disabled />
                  <div>
                    <span className="font-semibold text-slate-850">Unggah Laporan Realisasi DIPA</span>
                    <span className="block text-[9px] text-slate-400">SAKTI • Selesai</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Kehadiran Pekan ini: <strong>100%</strong></span>
              <span className="text-emerald-600 font-semibold uppercase">✓ Tuntas</span>
            </div>
          </div>
        </section>

        {/* 6 Primary Services Section */}
        <section id="integrated-services-section" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-blue-900 font-bold text-sm tracking-wider uppercase">
                <Activity size={15} />
                <span>Akses 6 Layanan Administrasi SPBE Utama</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Pilih Aplikasi untuk Melakukan Sinkronisasi Data atau Membuka Pratinjau
              </h3>
            </div>

            {/* Filter tags & Search input */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari Layanan/Fitur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3.5 py-2 w-52 sm:w-64 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200/40">
                <button
                  onClick={() => setActiveTab("semua")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === "semua" ? "bg-white text-[#0052ff] shadow-sm font-extrabold" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveTab("administrasi")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === "administrasi" ? "bg-white text-[#0052ff] shadow-sm font-extrabold" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Internal ASN
                </button>
                <button
                  onClick={() => setActiveTab("perencanaan")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === "perencanaan" ? "bg-white text-[#0052ff] shadow-sm font-extrabold" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Pembangunan
                </button>
              </div>
            </div>
          </div>

          {/* Quick instructions bar */}
          <div className="bg-blue-50 border border-blue-200/70 p-3 rounded-lg text-xs text-blue-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CornerDownRight size={14} className="text-blue-700 mt-0.5" />
              <span>Gunakan fitur <strong>Quick View / Pratinjau Kilat</strong> untuk memeriksa berkas, disposisi, dan anggaran tanpa meninggalkan portal pusat.</span>
            </span>
            <span className="font-bold text-blue-800 hidden sm:inline italic">1 Layanan butuh perhatian</span>
          </div>

          {/* Grid Container for 6 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length === 0 ? (
              <div className="col-span-full py-16 bg-white border border-slate-200 rounded-2xl text-center space-y-3">
                <ShieldAlert size={36} className="mx-auto text-slate-400 animate-pulse" />
                <p className="text-sm font-semibold text-slate-600">Layanan atau kata kunci pencarian tidak ditemukan.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveTab("semua"); }}
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs transition"
                >
                  Riset Filter
                </button>
              </div>
            ) : (
              filteredServices.map((service, idx) => {
                // Determine icons to display
                let serviceIcon = <Activity size={20} />;
                if (service.id === "aparatur-negara") serviceIcon = <CheckCircle className="text-sky-600" size={20} />;
                if (service.id === "pengadaan-barang") serviceIcon = <BookOpen className="text-emerald-600" size={20} />;
                if (service.id === "kearsipan-nasional") serviceIcon = <FileCheck2 className="text-amber-600" size={20} />;
                if (service.id === "pemerintah-daerah") serviceIcon = <SlidersHorizontal className="text-purple-600" size={20} />;
                if (service.id === "keuangan-negara") serviceIcon = <Clock className="text-red-600" size={20} />;
                if (service.id === "perencanaan-pembangunan") serviceIcon = <TrendingUp className="text-teal-600" size={20} />;

                // Check if any active action in notification corresponds to this service
                const hasPendingAction = notifications.some(n => n.serviceId === service.id && n.category === "Tindakan" && !n.isRead);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
                    className={`bg-white border rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between transition-all relative ${
                      hasPendingAction 
                        ? "border-amber-400 ring-2 ring-amber-300 ring-offset-0" 
                        : "border-slate-200 hover:border-slate-350 hover:shadow-md"
                    }`}
                  >
                    
                    {/* Top Accent Strip of service specific theme color */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: service.color }}></div>

                    {/* Pending alert ribbon */}
                    {hasPendingAction && (
                      <span className="absolute top-1.5 right-4 bg-amber-500 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-b-md shadow-xs animate-pulse">
                        Tindakan Mandiri Ditunda
                      </span>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        
                        {/* Header Row */}
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 bg-slate-100 rounded-xl">
                            {serviceIcon}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.officialReference}</span>
                            <h4 className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{service.name}</h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                          {service.description}
                        </p>

                        {/* Badges / Category */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${service.bgLight}`}>
                            {service.badge}
                          </span>
                          <span className="text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full font-mono">
                            SSO Link
                          </span>
                        </div>

                      </div>

                      {/* Summary Metrics Inside Grid Item */}
                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                        {service.quickMetrics.slice(0, 2).map((qm, qmIdx) => (
                          <div key={qmIdx} className="bg-slate-50 p-2 rounded border border-slate-150">
                            <span className="text-[9px] text-slate-400 block uppercase font-medium">{qm.label}</span>
                            <span className="font-bold text-slate-700 truncate block mt-0.5">{qm.value}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Action buttons */}
                    <div className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100/50 border-t border-slate-100 transition-colors flex justify-between items-center">
                      <a
                        href={`https://${service.officialReference}`}
                        target="_blank"
                        rel="no-referrer"
                        className="text-slate-500 hover:text-blue-900 text-xs inline-flex items-center gap-1 font-medium"
                      >
                        Portal Asli
                        <ExternalLink size={11} />
                      </a>

                      <button
                        id={`btn-preview-${service.id}`}
                        onClick={() => setSelectedService(service)}
                        className="px-3.5 py-2.5 bg-[#0052ff] hover:bg-[#0040d9] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-350 cursor-pointer"
                      >
                        Keandalan & Quick View
                      </button>
                    </div>

                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* Informational Guidance on SPBE standards */}
        <section className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 bg-emerald-600 rounded-xl text-white shrink-0">
            <Check size={24} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-emerald-900">Petunjuk Keamanan & Otoritas Mandiri ASN RI</h4>
            <p className="text-emerald-800 leading-relaxed font-sans">
              Semua aktivitas transaksi yang dilakukan melalui gerbang SSO ini diverifikasi secara berkala oleh Badan Siber dan Sandi Negara (BSSN). 
              Sesuai dengan Peraturan Presiden No. 95 Tahun 2018 tentang Sistem Pemerintahan Berbasis Elektronik (SPBE), Anda dilarang membagikan tautan sesi atau token OTP Anda kepada rekan kerja/pihak luar manapun.
            </p>
          </div>
        </section>

      </main>

      {/* Footer Branding */}
      <footer className="mt-auto py-6 border-t border-slate-200 bg-white text-slate-550 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="font-bold text-slate-800 flex items-center justify-center md:justify-start gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              KEMENTERIAN PENDAYAGUNAAN APARATUR NEGARA DAN REFORMASI BIROKRASI
            </p>
            <p className="text-slate-500 text-[11px]">Deputi Transformasi Digital Pemerintah</p>
          </div>
          <p className="text-[11px] text-slate-400">© 2026 INAGov. All rights reserved.</p>
        </div>
      </footer>

      {/* Active Service Quick Preview Overlay Modal rendering */}
      <QuickPreviewModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />

    </div>
  );
}
