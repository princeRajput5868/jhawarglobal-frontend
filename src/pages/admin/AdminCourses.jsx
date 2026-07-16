import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Plus, Edit, Trash2, Search, RefreshCw,
  BookOpen, CheckCircle, XCircle, Loader2, AlertCircle
} from "lucide-react";

export default function AdminCourses() {
  const navigate = useNavigate();
  const hasToken = !!getAdminToken();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }
    fetchCourses();
  }, [hasToken]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.get("/api/admin/courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (course) => {
    const ok = window.confirm(`Delete course "${course.title}"? This will also delete all modules.`);
    if (!ok) return;

    setDeletingId(course.id);
    try {
      await adminApi.delete(`/api/admin/courses/${course.slug}`);
      fetchCourses();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to delete course");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Courses" 
      subtitle="Manage all training programs"
      actions={
        <Link
          to="/admin/courses/new"
          className="inline-flex items-center gap-2 bg-[#7B1C1C] hover:bg-[#5f1515] text-white px-4 py-2 rounded-xl text-sm font-bold transition"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Link>
      }
    >
      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title or slug..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
            />
          </div>
          <button
            onClick={fetchCourses}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Courses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#7B1C1C]" />
            <span className="font-semibold text-gray-700">
              {filteredCourses.length} courses found
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Slug</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Title</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Level</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Duration</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Status</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#7B1C1C] mx-auto" />
                    <p className="text-gray-500 mt-2">Loading courses...</p>
                  </td>
                </tr>
              ) : filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    {searchQuery ? "No courses match your search" : "No courses found. Create your first course!"}
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-mono text-xs text-gray-600">{course.slug}</td>
                    <td className="p-4 font-semibold text-gray-800">{course.title}</td>
                    <td className="p-4 text-gray-600 text-xs">{course.level || "-"}</td>
                    <td className="p-4 text-gray-600 text-xs">{course.durationHours || "-"} hrs</td>
                    <td className="p-4">
                      {course.isActive ? (
                        <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          <XCircle className="w-3 h-3" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/courses/${course.slug}/edit`}
                          className="text-blue-600 font-semibold text-xs hover:underline flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                          to={`/admin/courses/${course.slug}/modules`}
                          className="text-[#7B1C1C] font-semibold text-xs hover:underline flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Modules
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => onDelete(course)}
                          disabled={deletingId === course.id}
                          className="text-red-500 font-semibold text-xs hover:underline flex items-center gap-1 disabled:opacity-50"
                        >
                          {deletingId === course.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}