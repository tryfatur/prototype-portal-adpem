/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldCheck, Lock, User, Eye, EyeOff, AlertCircle, Fingerprint, Award } from "lucide-react";
import { motion } from "motion/react";
import { MOCK_USER } from "../data/services";

interface LoginScreenProps {
  onLoginSuccess: (nip: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"credentials" | "biometric">("credentials");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate official secure SSO authentication check
    setTimeout(() => {
      if (nip.trim() === MOCK_USER.nip && password === "sso-asn-2026") {
        onLoginSuccess(nip);
      } else if (nip.trim() !== MOCK_USER.nip) {
        setError("NIP Pegawai tidak terdaftar di database terpusat BKN.");
        setIsLoading(false);
      } else {
        setError("Kata Sandi salah. Silakan coba lagi atau gunakan token TOTP.");
        setIsLoading(false);
      }
    }, 900);
  };

  const handlePrefill = () => {
    setNip(MOCK_USER.nip);
    setPassword("sso-asn-2026");
    setError(null);
  };

  const triggerBiometricMock = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      // Simulate fingerprint / face recognition success
      onLoginSuccess(MOCK_USER.nip);
    }, 1200);
  };

  return (
    <div id="login-screen" className="min-h-screen bg-[#060c18] flex flex-col justify-between overflow-x-hidden relative">
      {/* Decorative Top Bar - Red-White ribbon resembling Indonesian Flag */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#e1251b] via-[#ef4444] to-[#f8fafc] shadow-sm z-20"></div>

      {/* Background Decorative Ambient Glows - Sleek High-Contrast Spotlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0052ff] rounded-full filter blur-[150px] opacity-15 -mr-40 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ef4444] rounded-full filter blur-[150px] opacity-10 -ml-40 -mb-20 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 sm:p-10"
        >
          {/* Logo & Government Branding Badge */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-red-50 text-[#e1251b] text-[10px] font-bold rounded-full border border-red-150 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e1251b] animate-pulse"></span>
              Sistem Pemerintahan Berbasis Elektronik (SPBE)
            </div>
            
            {/* Elegant Emblem Mock in alignment with INA Digital brand */}
            <div className="h-14 w-14 rounded-xl bg-[#e1251b] flex items-center justify-center shadow-lg shadow-red-500/20 text-white font-extrabold text-2xl mb-4 tracking-wider transition-transform hover:scale-105 duration-300">
              INA
            </div>
            
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Portal SPBE
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Masuk menggunakan Akun SSO ASN Anda
            </p>
          </div>

          {/* Toggle Login Option tabs (Credentials vs Biometrics/Passkey) */}
          <div className="flex bg-slate-100/80 p-1 rounded-xl mb-6">
            <button
              onClick={() => setSelectedMethod("credentials")}
              type="button"
              className={`flex-1 text-center py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedMethod === "credentials"
                  ? "bg-white text-[#0052ff] shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Kata Sandi & NIP
            </button>
            <button
              onClick={() => {
                setSelectedMethod("biometric");
                setError(null);
              }}
              type="button"
              className={`flex-1 text-center py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                selectedMethod === "biometric"
                  ? "bg-white text-[#0052ff] shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Fingerprint size={13} /> Biometrik / Passkey
            </button>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-3.5 text-[#e1251b] text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-[#e1251b]" />
              <span className="font-medium lead-relaxed">{error}</span>
            </div>
          )}

          {selectedMethod === "credentials" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nomor Induk Pegawai (NIP)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-450">
                    <User size={16} />
                  </div>
                  <input
                    id="nip-input"
                    type="text"
                    required
                    placeholder="Contoh: 19880415..."
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#f8fafc] border border-slate-200 rounded-xl text-slate-800 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Kata Sandi SSO
                  </label>
                  <a href="#reset" className="text-xs text-[#0052ff] font-semibold hover:underline">
                    Lupa Sandi?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-450">
                    <Lock size={16} />
                  </div>
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-11 py-3 text-sm bg-[#f8fafc] border border-slate-200 rounded-xl text-slate-800 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-650 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Secure Environment indicator */}
              <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100 flex items-center gap-2.5 text-[11px] text-[#0052ff]">
                <ShieldCheck size={15} className="text-[#0052ff] shrink-0" />
                <span className="font-medium leading-normal">Saluran aman terenkripsi TLS 1.3 bersertifikat BSrE Nasional</span>
              </div>

              {/* Submit button */}
              <button
                id="btn-login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#0052ff] hover:bg-[#0040d9] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    Memvalidasi data...
                  </span>
                ) : (
                  "Masuk Ke Portal"
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto h-20 w-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner">
                <Fingerprint size={36} className="text-[#0052ff] animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Autentikasi Cepat dengan Sidik Jari / Wajah
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Pastikan perangkat pemindai biometrik Anda telah terdaftar dan terhubung dalam aplikasi Portal ASN Terpadu Mobile.
                </p>
              </div>

              <button
                type="button"
                onClick={triggerBiometricMock}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-slate-950 transition-all cursor-pointer"
              >
                {isLoading ? "Menghubungi Perangkat..." : "Gunakan Windows Hello / Touch ID"}
              </button>
            </div>
          )}

          {/* SIMULATOR ASSISTANT (Crucial helper block to allow immediate and flawless prototyping) */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-blue-50/40 rounded-xl p-4 border border-blue-105 border-blue-100/70">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0052ff] mb-2">
                <Award size={15} />
                <span>Simulasi AKSES CEPAT (Uji Coba):</span>
              </div>
              <p className="text-[11px] text-slate-650 leading-relaxed mb-3">
                Tekan tombol di bawah untuk mengisi kredensial simulasi secara otomatis dan langsung masuk memeriksa dashboard terpadu:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-700 mb-3 bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
                <div>
                  <span className="text-slate-400 block font-sans text-[9px] font-bold uppercase tracking-wider">NIP Pegawai</span>
                  <span className="font-bold text-slate-800">{MOCK_USER.nip}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[9px] font-bold uppercase tracking-wider">Kata Sandi</span>
                  <span className="font-bold text-slate-800">sso-asn-2026</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePrefill}
                className="w-full py-2 px-3 text-center bg-[#0052ff] hover:bg-[#0040d9] text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Isi Otomatis & Siapkan Masuk
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Legalities / Helpdesk */}
      <footer className="py-5 border-t border-slate-100 bg-white text-center text-xs text-slate-500 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="font-sans text-[11px]">
            © {new Date().getFullYear()} <strong>INA DIGITAL</strong> - Kementerian PANRB RI. Hak Cipta Dilindungi.
          </span>
          <div className="flex gap-4 text-[11px] font-medium">
            <a href="#help" className="text-slate-550 hover:text-[#0052ff] transition-colors">Pusat Bantuan</a>
            <span className="text-slate-300">•</span>
            <a href="#privacy" className="text-slate-550 hover:text-[#0052ff] transition-colors">Kebijakan Privasi</a>
            <span className="text-slate-300">•</span>
            <a href="#rules" className="text-slate-550 hover:text-[#0052ff] transition-colors">Syarat Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
