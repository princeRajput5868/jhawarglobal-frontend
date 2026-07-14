import { Link } from "react-router-dom";

export default function Sidebar({ activePath }) {
  const nav = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/certificates", label: "certificates" },
    // Existing app uses /admin/courses/:slug/modules; keep a sensible parent link.
    { to: "/admin/courses", label: "Courses" },
  ];

  const isActive = (to) => {
    if (to === "/admin/courses") return activePath.startsWith("/admin/courses/");
    return activePath === to || activePath.startsWith(`${to}/`);
  };

  return (
    <div className="h-full px-4 py-5">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold">A</div>
        <div>
          <div className="font-extrabold text-gray-900 leading-tight">Admin</div>
          <div className="text-xs text-gray-500">Control panel</div>
        </div>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              "block px-3 py-2 rounded-md text-sm font-bold " +
              (isActive(item.to)
                ? "bg-red-50 text-red-700 border border-red-100"
                : "text-gray-700 hover:bg-gray-50 border border-transparent")
            }
          >
            {item.label}
          </Link>
        ))}

        <div className="mt-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider px-3">More</div>

        <div className="grid gap-2 mt-2">
          {[
            { to: "/admin/categories", label: "Categories" },
            { to: "/admin/gallery", label: "Gallery" },
            { to: "/admin/contacts", label: "Contacts" },
            { to: "/admin/team", label: "Team" },
            { to: "/admin/settings", label: "Settings" },
            { to: "/admin/profile", label: "Profile" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                "block px-3 py-2 rounded-md text-sm font-bold " +
                (isActive(item.to)
                  ? "bg-red-50 text-red-700 border border-red-100"
                  : "text-gray-700 hover:bg-gray-50 border border-transparent")
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

