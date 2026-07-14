import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold text-gray-900">Admin Panel</div>
          <div className="text-xs text-gray-500">Manage your site</div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-sm font-bold text-red-700 hover:text-red-800 px-3 py-2 rounded-md border border-red-100 hover:bg-red-50"
          >
            View site
          </Link>
        </div>
      </div>
    </div>
  );
}

