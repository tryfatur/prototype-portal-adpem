/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionNip, setSessionNip] = useState<string | null>(null);

  const handleLogin = (nip: string) => {
    setSessionNip(nip);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setSessionNip(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full h-full min-h-screen text-slate-800 antialiased bg-slate-50 selection:bg-blue-600 selection:text-white">
      {isLoggedIn ? (
        <DashboardScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

