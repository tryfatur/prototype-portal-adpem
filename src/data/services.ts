/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, ASNUser, SystemNotification, PerformanceMetric } from "../types";

export const MOCK_USER: ASNUser = {
  nip: "198804152010121003",
  name: "Fulan bin Fulan",
  jabatan: "Pranata Komputer Ahli Madya",
  instansi: "Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB)",
  golongan: "Pembina - IV/a",
  avatarUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=256"
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "aparatur-negara",
    name: "Layanan Aparatur Negara",
    logoCode: "user-check",
    badge: "Integritas & Kinerja",
    color: "#0284c7", // Sky blue
    bgLight: "bg-sky-50 text-sky-800 border-sky-200",
    description: "Pelayanan administrasi kepegawaian ASN yang mencakup e-Kinerja, Sistem Informasi ASN (SIASN), Kenaikan Pangkat Elektronik, Layanan Pensiun, serta Administrasi Presensi dan Izin secara terpusat.",
    officialReference: "siasn.bkn.go.id",
    keyFeatures: [
      {
        title: "Pemberkasan e-Kinerja",
        description: "Penyusunan Sasaran Kinerja Pegawai (SKP) tahunan, matriks peran hasil, dan penilaian kinerja berkala oleh atasan langsung.",
        status: "Operasional",
        metric: "SKP 2026 Aktif"
      },
      {
        title: "Kenaikan Pangkat Digital (SIASN)",
        description: "Pengusulan kenaikan pangkat secara otomatis tanpa berkas kertas (paperless), terintegrasi langsung dengan database BKN.",
        status: "Operasional",
        metric: "Proses Otomatis"
      },
      {
        title: "Presensi Terintegrasi",
        description: "Pencatatan kehadiran, pengajuan cuti, dan tugas dinas luar menggunakan validasi GPS dan biometrik wajah langsung ke instansi.",
        status: "Pembaruan"
      }
    ],
    quickMetrics: [
      { label: "Sasaran SKP Terverifikasi", value: "94.8%", trend: "+2.1% bulan ini", trendType: "up" },
      { label: "IP ASN Instansi", value: "82.5", trend: "Sangat Baik (BKN)", trendType: "neutral" },
      { label: "Cuti Tersisa", value: "11 Hari", trend: "Kadaluarsa Des 2026", trendType: "neutral" }
    ],
    recentActivity: [
      { time: "08:15", activity: "Presensi Masuk berhasil dicatat via Validasi Biometrik.", user: "Sistem Presensi" },
      { time: "Kemarin", activity: "Persetujuan SKP Periode Triwulan I disetujui oleh Kepala Biro.", user: "Dra. Elok Sulbiyah" },
      { time: "28 Mei", activity: "Mengunggah sertifikat Kompetensi Teknis Kecerdasan Artifisial.", user: "Anda" }
    ]
  },
  {
    id: "pengadaan-barang",
    name: "Layanan Pengadaan Barang & Jasa",
    logoCode: "shopping-bag",
    badge: "Transparansi & Efisiensi",
    color: "#10b981", // Emerald
    bgLight: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description: "Sistem e-Procurement terpadu yang memuat LPSE (Layanan Pengadaan Secara Elektronik), e-Katalog Sektoral & Nasional, Rencana Umum Pengadaan (SiRUP), serta monitoring kinerja penyedia jasa.",
    officialReference: "lpse.lkpp.go.id",
    keyFeatures: [
      {
        title: "e-Katalog Lokal & Nasional v5",
        description: "Belanja modal langsung untuk barang/jasa terdaftar secara cepat melalui metode online purchasing tanpa lelang rumit.",
        status: "Operasional",
        metric: "1.2jt Produk"
      },
      {
        title: "Tender & Seleksi Kilat",
        description: "Metode pemilihan vendor konstruksi/non-konstruksi dengan sistem bidding transparan, terenkripsi Apendo pihak ketiga.",
        status: "Operasional",
        metric: "E-Bidding Aktif"
      },
      {
        title: "SiRUP (Rencana Umum Pengadaan)",
        description: "Penyusunan draf paket pengadaan barang dan anggaran operasional sebelum masuk ke tahap pengisian RKA-K/L.",
        status: "Pemeliharaan"
      }
    ],
    quickMetrics: [
      { label: "Paket Pengadaan Berjalan", value: "3 Paket", trend: "Tahap Evaluasi Dokumen", trendType: "neutral" },
      { label: "Total Anggaran Ter-RUP", value: "Rp 1.4 M", trend: "72% dari Pagu Instansi", trendType: "up" },
      { label: "Pencapaian TKDN", value: "48.2%", trend: "Melebihi target nasional", trendType: "up" }
    ],
    recentActivity: [
      { time: "09:30", activity: "Mengases paket RUP Pengadaan Server Layanan Cloud Lokal.", user: "Pokja IV - LKPP" },
      { time: "29 Mei", activity: "Membatalkan usulan Paket ATK karena revisi RKA-K/L.", user: "Anda" },
      { time: "25 Mei", activity: "Registrasi verifikasi e-Purchasing Laptop Instansi berhasil disetujui.", user: "PPK KemenPANRB" }
    ]
  },
  {
    id: "kearsipan-nasional",
    name: "Layanan Kearsipan (SRIKANDI)",
    logoCode: "file-text",
    badge: "Efisiensi Tata Persuratan",
    color: "#f59e0b", // Amber
    bgLight: "bg-amber-50 text-amber-800 border-amber-200",
    description: "Sistem Informasi Kearsipan Dinamis Terintegrasi (SRIKANDI) sebagai wadah korespondensi resmi kedinasan seluruh Instansi Pemerintah dengan dukungan Tanda Tangan Elektronik (TTE) tersertifikasi BSrE.",
    officialReference: "srikandi.arsip.go.id",
    keyFeatures: [
      {
        title: "Korespondensi Multi-Instansi",
        description: "Pengiriman surat dinas resmi, nota dinas, dan disposisi antar instansi kementerian/lembaga/pemda secara instan.",
        status: "Operasional",
        metric: "Koneksi Realtime"
      },
      {
        title: "Tanda Tangan Elektronik (TTE)",
        description: "Verifikasi dokumen dan pencatatan tanda tangan digital bersertifikasi resmi BSrE (Badan Siber dan Sandi Negara).",
        status: "Operasional",
        metric: "TTE Valid"
      },
      {
        title: "Pemberkasan Arsip Statis/Dinamis",
        description: "Manajemen siklus hidup surat menyurat mulai penciptaan, penggunaan, pemeliharaan hingga penyusunan jadwal retensi arsip.",
        status: "Operasional",
        metric: "Klasifikasi Otomatis"
      }
    ],
    quickMetrics: [
      { label: "Surat Masuk Belum Ditindak", value: "4 Dokumen", trend: "Butuh Disposisi Segera", trendType: "down" },
      { label: "TTE Draft Menunggu", value: "1 Nota", trend: "Menunggu tanda tangan Anda", trendType: "down" },
      { label: "Arsip Dinamis Tersimpan", value: "412 Surat", trend: "Aksesibilitas 100%", trendType: "neutral" }
    ],
    recentActivity: [
      { time: "10:00", activity: "Menerima Surat Dinas dari Bappenas perihal Usulan Grand Design SPBE 2026.", user: "Sekretariat Utama" },
      { time: "Yesterday", activity: "Mendisposisikan Nota Persetujuan Ruangan ke Subbagian Rumah Tangga.", user: "Anda" },
      { time: "Kemarin", activity: "Melakukan TTE Nota Dinas Laporan Bulanan Pusdatin.", user: "Anda" }
    ]
  },
  {
    id: "pemerintah-daerah",
    name: "Layanan Pemerintah Daerah",
    logoCode: "building-2",
    badge: "Sinergi & Otonomi",
    color: "#8b5cf6", // Purple
    bgLight: "bg-purple-50 text-purple-800 border-purple-200",
    description: "Sistem Informasi Pemerintahan Daerah (SIPD) terintegrasi serta pemantauan e-Perencanaan, e-Penganggaran, e-Pembangunan, evaluasi LPPD, serta tata urusan regulasi otonomi daerah se-Indonesia.",
    officialReference: "sipd.kemendagri.go.id",
    keyFeatures: [
      {
        title: "Klasifikasi Akun Keuangan Daerah",
        description: "Sinkronisasi kodefikasi aset, belanja, pendapatan daerah seluruh provinsi dan kabupaten/kota secara standar nasional.",
        status: "Operasional"
      },
      {
        title: "Evaluasi LPPD Online",
        description: "Penyusunan Laporan Penyelenggaraan Pemerintahan Daerah secara terukur dengan indikator kinerja makro daerah.",
        status: "Operasional",
        metric: "E-Monev Daerah"
      },
      {
        title: "Pemetaan Tata Ruang Wilayah",
        description: "Koordinasi spasial pemanfaatan kawasan hutan, pertanian, dan industri demi keseimbangan ekologis pembangunan daerah.",
        status: "Pembaruan"
      }
    ],
    quickMetrics: [
      { label: "Kepatuhan SIPD Pemda", value: "98.4%", trend: "Standar Kemendagri terpenuhi", trendType: "up" },
      { label: "Evaluasi LPPD Selesai", value: "508 Pemda", trend: "94% dari seluruh daerah RI", trendType: "up" },
      { label: "Penyelarasan RPJMD", value: "Optimal", trend: "Kerangka Nasional sinkron", trendType: "neutral" }
    ],
    recentActivity: [
      { time: "10:45", activity: "Mengharmonisasikan usulan RKPD Provinsi Papua Barat Daya.", user: "Sistem SIPD" },
      { time: "30 Mei", activity: "Verifikasi kepatuhan DAK Fisik Kota Salatiga rampung.", user: "Tim Reviewer SIPD" },
      { time: "24 Mei", activity: "Memperbarui modul Standar Harga Satuan Regional Jawa Tengah.", user: "Subdit Keuangan Daerah" }
    ]
  },
  {
    id: "keuangan-negara",
    name: "Layanan Keuangan (SAKTI)",
    logoCode: "wallet",
    badge: "Akuntabilitas Fiskal",
    color: "#ef4444", // Red
    bgLight: "bg-red-50 text-red-800 border-red-200",
    description: "Sistem Aplikasi Keuangan Tingkat Instansi (SAKTI) untuk pengelolaan APBN mulai dari modul Penganggaran, Komitmen, Pembayaran (SPM/SP2D), Bendahara, hingga Pelaporan Akuntansi Pemerintah.",
    officialReference: "sakti.kemenkeu.go.id",
    keyFeatures: [
      {
        title: "Penerbitan SPM & SP2D Kilat",
        description: "Pembuatan Surat Perintah Membayar serta pencairan dana secara elektronik langsung ke kas penyedia/pegawai tanpa tatap muka.",
        status: "Operasional",
        metric: "Dalam 2 Jam"
      },
      {
        title: "Modul Komitmen Anggaran",
        description: "Pencatatan estimasi kontrak belanja modal instansi guna mengunci pagu anggaran agar tidak terjadi over-budgeting.",
        status: "Operasional",
        metric: "Pagu Terdeteksi"
      },
      {
        title: "Konsolidasi Laporan Keuangan",
        description: "Penyusunan neraca, laporan realisasi anggaran bulanan otomatis berbasis Standar Akuntansi Pemerintah (SAP).",
        status: "Operasional"
      }
    ],
    quickMetrics: [
      { label: "Realisasi Pagu Belanja", value: "42.8%", trend: "Sesuai target Triwulan II", trendType: "up" },
      { label: "SPM Menunggu Verifikasi", value: "0 Dokumen", trend: "Semua tagihan dicairkan", trendType: "up" },
      { label: "Nilai IKPA Instansi", value: "96.4", trend: "Sangat Baik (Kemenkeu)", trendType: "up" }
    ],
    recentActivity: [
      { time: "11:15", activity: "SPM Gaji dan Tunjangan Kinerja Bulan Juni berhasil diterbitkan.", user: "Bendahara Pengeluaran" },
      { time: "01 Jun", activity: "Melakukan unggahan revisi DIPA Kementerian PANRB Ke-3.", user: "Anda" },
      { time: "27 Mei", activity: "Rekonsiliasi Pajak Belanja Modal Triwulan I dengan KPP Pratama diselesaikan.", user: "Operator SAKTI" }
    ]
  },
  {
    id: "perencanaan-pembangunan",
    name: "Layanan Perencanaan (KRISNA)",
    logoCode: "presentation",
    badge: "Keselarasan Pembangunan",
    color: "#0d9488", // Teal
    bgLight: "bg-teal-50 text-teal-800 border-teal-200",
    description: "Kolaborasi Perencanaan dan Informasi Kinerja Anggaran (KRISNA) untuk mengintegrasikan proses perencanaan (RKP/Renja K/L) dengan penganggaran APBN nasional guna efisiensi tata laksana program.",
    officialReference: "krisna.bappenas.go.id",
    keyFeatures: [
      {
        title: "Pemberkasan Renja K/L Terpadu",
        description: "Pengisian usulan insentif, sasaran program nasional, rincian output (RO), serta pendukung program prioritas nasional.",
        status: "Operasional",
        metric: "Renja Terinput"
      },
      {
        title: "E-Monev Bappenas (Satu Data)",
        description: "Pelaporan kemajuan target sasaran fisik utama dan penyerapan kinerja bulanan terhadap program pembangunan daerah terluar.",
        status: "Operasional",
        metric: "Evaluasi Terkoneksi"
      },
      {
        title: "Integrasi SDGs & Prioritas Nasional",
        description: "Pemetakan alokasi anggaran khusus untuk mencapai target Tujuan Pembangunan Berkelanjutan (SDGs) nasional.",
        status: "Pembaruan"
      }
    ],
    quickMetrics: [
      { label: "Kesesuaian RKP - Renja K/L", value: "100%", trend: "Sinkronisasi Sempurna", trendType: "up" },
      { label: "Jumlah Rincian Output (RO)", value: "24 Usulan", trend: "Disetujui Bappenas", trendType: "up" },
      { label: "Pencapaian Indikator Prioritas", value: "88.6%", trend: "+5% dari target 2025", trendType: "up" }
    ],
    recentActivity: [
      { time: "11:30", activity: "Mensinkronkan target indikator SPBE nasional dengan usulan Renja 2027.", user: "Bappenas RI" },
      { time: "31 Mei", activity: "Menyelesaikan input rincian output 'Peningkatan Efektivitas TI Biro Krida'.", user: "Anda" },
      { time: "26 Mei", activity: "Menerima Rekomendasi Hasil Monev Bappenas atas Program Reformasi Birokrasi.", user: "Tim Perencana" }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: "notif-1",
    serviceId: "kearsipan-nasional",
    serviceName: "Kearsipan (SRIKANDI)",
    title: "Tanda Tangan Elektronik (TTE) Diperlukan",
    message: "Nota Dinas Dinas PAN-RB No 421/2026 mengenai Penyelarasan Tim IT membutuhkan Tanda Tangan Elektronik Anda.",
    timestamp: "10 menit yang lalu",
    category: "Tindakan",
    isRead: false
  },
  {
    id: "notif-2",
    serviceId: "aparatur-negara",
    serviceName: "Aparatur Negara (SIASN)",
    title: "Verifikasi SKP Bawahan",
    message: "Terdapat 2 orang ASN di subbagian Anda yang telah mengajukan draft e-Kinerja Triwulan I untuk dinilai.",
    timestamp: "1 jam yang lalu",
    category: "Tindakan",
    isRead: false
  },
  {
    id: "notif-3",
    serviceId: "keuangan-negara",
    serviceName: "Keuangan (SAKTI)",
    title: "SP2D Gaji Juni Berhasil Cair",
    message: "Kementerian Keuangan telah mencairkan SP2D untuk gaji pokok dan tunjangan operasional instansi.",
    timestamp: "2 jam yang lalu",
    category: "Info",
    isRead: false
  },
  {
    id: "notif-4",
    serviceId: "pengadaan-barang",
    serviceName: "Pengadaan (LPSE)",
    title: "Tender Selesai Evaluasi",
    message: "Tender Paket Pengadaan Laptop Pusdatin PANRB telah menyelesaikan masa sanggah. Vendor pemenang siap dikontrak.",
    timestamp: "Kemarin",
    category: "Penting",
    isRead: true
  },
  {
    id: "notif-5",
    serviceId: "perencanaan-pembangunan",
    serviceName: "Perencanaan (KRISNA)",
    title: "Batas Waktu Revisi Renja K/L",
    message: "Batas akhir revisi Rencana Kerja Kementerian PANRB untuk alokasi TA 2027 diperpanjang hingga 15 Juni 2026.",
    timestamp: "2 hari yang lalu",
    category: "Penting",
    isRead: true
  },
  {
    id: "notif-6",
    serviceId: "pemerintah-daerah",
    serviceName: "Pemerintah Daerah (SIPD)",
    title: "Sinkronisasi Pagu DAK",
    message: "Penyelarasan Pagu Dana Alokasi Khusus (DAK) fisik daerah perbatasan Kalimantan telah rampung diverifikasi.",
    timestamp: "3 hari yang lalu",
    category: "Info",
    isRead: true
  }
];

export const MOCK_PERFORMANCE_DATA: PerformanceMetric[] = [
  { month: "Jan", dokumenSelesai: 24, skpTarget: 22, kehadiranPercent: 98.2 },
  { month: "Feb", dokumenSelesai: 28, skpTarget: 25, kehadiranPercent: 99.1 },
  { month: "Mar", dokumenSelesai: 32, skpTarget: 30, kehadiranPercent: 97.4 },
  { month: "Apr", dokumenSelesai: 25, skpTarget: 28, kehadiranPercent: 95.8 },
  { month: "Mei", dokumenSelesai: 38, skpTarget: 35, kehadiranPercent: 100 },
  { month: "Jun", dokumenSelesai: 15, skpTarget: 15, kehadiranPercent: 98.5 } // Current month data (since June 2026 in metadata)
];
