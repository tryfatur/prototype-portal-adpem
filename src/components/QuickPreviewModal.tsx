/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail } from "../types";
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Settings2, 
  Activity, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  ShoppingBag,
  FileText,
  Building2,
  Wallet,
  Presentation
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuickPreviewModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

// Icon Mapping helper based on logoCode string
const renderServiceIcon = (code: string, size = 24, className = "") => {
  switch (code) {
    case "user-check":
      return <UserCheck size={size} className={className} />;
    case "shopping-bag":
      return <ShoppingBag size={size} className={className} />;
    case "file-text":
      return <FileText size={size} className={className} />;
    case "building-2":
      return <Building2 size={size} className={className} />;
    case "wallet":
      return <Wallet size={size} className={className} />;
    case "presentation":
      return <Presentation size={size} className={className} />;
    default:
      return <Activity size={size} className={className} />;
  }
};

export default function QuickPreviewModal({ service, onClose }: QuickPreviewModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 relative flex flex-col max-h-[90vh]"
        >
          {/* Header Colored Banner matching the Service theme */}
          <div 
            className="p-6 text-white relative"
            style={{ 
              background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` 
            }}
          >
            {/* Design Ribbon Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full filter blur-xl -mr-10 -mt-10"></div>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/15 rounded-xl border border-white/20 shadow-md">
                  {renderServiceIcon(service.logoCode, 28, "text-white")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/25 text-white/95 uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border border-white/10">
                      {service.badge}
                    </span>
                    <span className="text-xs bg-emerald-500 text-white font-semibold px-2 py-0.5 rounded-full">
                      Tersambung SSO
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1 tracking-tight">{service.name}</h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-black/10 hover:bg-black/25 text-white transition-all focus:outline-none"
                aria-label="Tutup pratinjau"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3.5 text-xs text-white/90 leading-relaxed font-sans max-w-xl">
              {service.description}
            </p>
          </div>

          {/* Modal Main Body Scroll container */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Quick Metrics Panels */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5">
                Metrik Kunci Layanan (Live SPBE)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {service.quickMetrics.map((met, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">{met.label}</span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-slate-800 font-sans tracking-tight">{met.value}</span>
                      {met.trend && (
                        <span className={`text-[9px] font-semibold px-1 rounded ${
                          met.trendType === "up" ? "bg-emerald-50 text-emerald-800" :
                          met.trendType === "down" ? "bg-red-50 text-red-800" : "bg-slate-100 text-slate-600"
                        }`}>
                          {met.trend}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Modules List */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5">
                Fitur Utama & Keandalan Modul
              </h3>
              <div className="space-y-2.5">
                {service.keyFeatures.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-start gap-4 p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-800">{feat.title}</h4>
                        {feat.metric && (
                          <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.2 rounded font-mono font-medium">
                            {feat.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">{feat.description}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        feat.status === "Operasional" ? "bg-emerald-100 text-emerald-800" :
                        feat.status === "Pembaruan" ? "bg-blue-100/80 text-blue-800" : "bg-amber-100 text-amber-850"
                      }`}>
                        {feat.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Service Activity Logs */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Riwayat Aktivitas & Transaksi Anda
                </h3>
                <span className="text-[10px] text-slate-400 italic">Terakhir diakses hari ini pukul 11:40 WITA</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-3 font-sans text-xs">
                {service.recentActivity.map((act, idx) => (
                  <div key={idx} className="flex gap-3 justify-between items-start border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex gap-2">
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded shrink-0 h-fit">
                        {act.time}
                      </span>
                      <p className="text-slate-700 font-medium">{act.activity}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0 italic">Oleh: {act.user}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Domain Resmi:</span>
              <a 
                href={`https://${service.officialReference}`} 
                target="_blank" 
                rel="no-referrer"
                className="text-blue-600 font-mono hover:underline inline-flex items-center gap-0.5 font-bold"
              >
                {service.officialReference}
                <ExternalLink size={10} className="inline" />
              </a>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                type="button"
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 bg-white cursor-pointer"
              >
                Kembali ke Dashboard
              </button>
              
              <a
                href={`https://${service.officialReference}`}
                target="_blank"
                rel="no-referrer"
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-extrabold text-white bg-[#0052ff] hover:bg-[#0040d9] rounded-xl transition-colors shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5"
              >
                Luncurkan Aplikasi Penuh
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
