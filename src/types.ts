/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetail {
  id: string;
  name: string;
  logoCode: string; // Used to identify icon
  badge: string;
  color: string; // hex or Tailwind color class
  bgLight: string; // light background class
  description: string;
  officialReference: string;
  keyFeatures: {
    title: string;
    description: string;
    status: "Operasional" | "Pemeliharaan" | "Pembaruan";
    metric?: string;
  }[];
  quickMetrics: {
    label: string;
    value: string;
    trend?: string;
    trendType?: "up" | "down" | "neutral";
  }[];
  recentActivity: {
    time: string;
    activity: string;
    user: string;
  }[];
}

export interface ASNUser {
  nip: string;
  name: string;
  jabatan: string;
  instansi: string;
  golongan: string;
  avatarUrl: string;
}

export interface SystemNotification {
  id: string;
  serviceId: string;
  serviceName: string;
  title: string;
  message: string;
  timestamp: string;
  category: "Penting" | "Info" | "Tindakan";
  isRead: boolean;
}

export interface PerformanceMetric {
  month: string;
  dokumenSelesai: number;
  skpTarget: number;
  kehadiranPercent: number;
}
