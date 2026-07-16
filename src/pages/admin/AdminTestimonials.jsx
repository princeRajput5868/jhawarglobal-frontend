import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Plus, Edit, Trash2, Search, RefreshCw,
  User, MapPin, BookOpen, MessageSquare, Loader2, AlertCircle, CheckCircle, XCircle
} from "lucide-react";

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const hasToken = !!getAdminToken();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }
    fetchTestimonials();
  }, [hasToken]);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.get("/api/admin/testimonials");
      setTestimonials(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (testimonial) => {
    const ok = window.confirm(`Delete testimonial from "${testimonial.name}"?`);
    if (!ok) return;
    setDeletingId(testimonial.id);
    try {
      await adminApi.delete(`/api/admin/testimonials/${testimonial.id}`);
      fetchTestimonials();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = testimonials.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Testimonials" 
      subtitle="Manage student feedback"
      actions={
        <Link
          to="/admin/testimonials/new"
          className="inline-flex items-center gap-2 bg-[#C62828] hover:bg-[#8E0000] text-white px-4 py-2 rounded-xl text-sm font-bold transition"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or course..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition"
            />
          </div>
          <button
            onClick={fetchTestimonials}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <span className="font-semibold text-gray-700">{filtered.length} testimonials found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Name</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Course</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Place</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Status</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#C62828] mx-auto" />
                    <p className="text-gray-500 mt-2">Loading...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No testimonials found. Add your first student feedback!
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold text-gray-800">{t.name}</td>
                    <td className="p-4 text-gray-600">{t.course}</td>
                    <td className="p-4 text-gray-600">{t.place}</td>
                    <td className="p-4">
                      {t.isActive ? (
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
                          to={`/admin/testimonials/${t.id}/edit`}
                          className="text-blue-600 font-semibold text-xs hover:underline flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => onDelete(t)}
                          disabled={deletingId === t.id}
                          className="text-red-500 font-semibold text-xs hover:underline flex items-center gap-1 disabled:opacity-50"
                        >
                          {deletingId === t.id ? (
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