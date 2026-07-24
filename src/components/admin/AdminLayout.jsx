import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAdminToken } from "../../lib/adminApi";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/admin",
    match: (p) => p === "/admin",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Diplomas",
    to: "/admin/certificates",
    match: (p) => p === "/admin/certificates" || p.startsWith("/admin/certificates") && !p.includes("/certificates-new"),
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2" />
        <path d="M13 10h5M13 13h5M6 17h12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Certificates",
    to: "/admin/certificates-new",
    match: (p) => p.startsWith("/admin/certificates-new"),
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#F2A93B" />
        <circle cx="9" cy="11" r="2" stroke="#F2A93B" />
        <path d="M13 10h5M13 13h5M6 17h12" stroke="currentColor" />
        <path d="M8 7h2M8 9h2" stroke="#F2A93B" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Courses",
    to: "/admin/courses",
    match: (p) => p.startsWith("/admin/courses"),
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Settings",
    to: "/admin/settings",
    match: (p) => p.startsWith("/admin/settings"),
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AdminLayout({ title, subtitle, actions, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const doLogout = () => {
    setAdminToken(null);
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#7B1C1C] text-white flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu" className="p-1">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <span className="font-bold tracking-wide text-sm">JGF ADMIN</span>
        <div className="w-6" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 z-40 h-screen w-64 bg-[#7B1C1C] text-white flex flex-col shrink-0 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <div>
              <div className="font-extrabold tracking-wide text-lg leading-tight">JGF Admin</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider">Jawahar Global Foundation</div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = item.match(location.pathname);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                  ${active ? "bg-white text-[#7B1C1C]" : "text-white/85 hover:bg-white/10"}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-4 border-t border-white/10">
            <button
              onClick={doLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/85 hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <header className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 sticky top-0 z-20">
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">{actions}</div>
          </header>

          <div className="lg:hidden px-4 pt-5 pb-1">
            <h1 className="text-lg font-extrabold text-gray-900">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
          </div>

          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}