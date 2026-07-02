import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const hasToken = useMemo(() => !!getAdminToken(), []);

  useEffect(() => {
    (async () => {
      if (!hasToken) return;
      setLoading(true);
      setErr(null);
      try {
        const res = await adminApi.get("/api/admin/courses");

        setCourses(res.data || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    })();
  }, [hasToken]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Courses management</p>
          </div>
          <div className="text-sm text-gray-500">Total: {courses.length}</div>
        </div>

        {err && <div className="mb-4 text-red-700 text-sm">{err}</div>}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Courses</h2>
            {/* placeholder for future create */}
            <Link
              to="/admin/courses"
              className="text-sm font-bold text-red-700 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-3">Slug</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Active</th>
                  <th className="p-3">Modules</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-6 text-sm text-gray-500">Loading...</td></tr>
                ) : courses.length === 0 ? (
                  <tr><td colSpan={5} className="p-6 text-sm text-gray-500">No courses found</td></tr>
                ) : (
                  courses.map((c) => (
                    <tr key={c.id} className="border-t text-sm">
                      <td className="p-3 font-mono text-gray-800">{c.slug}</td>
                      <td className="p-3 font-semibold text-gray-900">{c.title}</td>
                      <td className="p-3 text-gray-700">{c.level || "-"}</td>
                      <td className="p-3">
                        {c.isActive ? <span className="text-green-700 font-bold">Yes</span> : <span className="text-gray-500 font-bold">No</span>}
                      </td>
                      <td className="p-3">
                        <Link to={`/admin/courses/${c.slug}/modules`} className="text-red-700 font-bold hover:underline">Manage</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

