import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Save, ArrowLeft, Loader2, AlertCircle, CheckCircle,
  User, Briefcase, Building, Globe
} from "lucide-react";

export default function AdminPlacementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasToken = !!getAdminToken();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    image: "",
    isActive: true,
    orderIndex: 0,
  });

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }
    if (isEditing) fetchPlacement();
  }, [hasToken, isEditing]);

  const fetchPlacement = async () => {
    try {
      const res = await adminApi.get(`/api/admin/placements/${id}`);
      const data = res.data;
      setForm({
        name: data.name || "",
        role: data.role || "",
        company: data.company || "",
        image: data.image || "",
        isActive: data.isActive !== undefined ? data.isActive : true,
        orderIndex: data.orderIndex || 0,
      });
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load placement");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      if (isEditing) {
        await adminApi.put(`/api/admin/placements/${id}`, form);
        setSuccess("Placement updated successfully!");
      } else {
        await adminApi.post("/api/admin/placements", form);
        setSuccess("Placement created successfully!");
        setTimeout(() => navigate("/admin/placements"), 1500);
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEditing ? "Edit Placement" : "Add Placement"} subtitle="Loading...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#C62828]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={isEditing ? "Edit Placement" : "Add Placement"} 
      subtitle={isEditing ? "Update student success story" : "Create a new success story"}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/placements")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#C62828] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Placements
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Student Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition"
                placeholder="e.g. Priya Sharma"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                Role *
              </label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition"
                placeholder="e.g. Salon Expert"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                Company *
              </label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition"
                placeholder="e.g. Lakmé — Noida"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Image URL
              </label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Order Index</label>
              <input
                type="number"
                value={form.orderIndex}
                onChange={(e) => setForm({ ...form, orderIndex: Number(e.target.value) })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Status
              </label>
              <div className="flex gap-4 mt-1.5">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={form.isActive === true}
                    onChange={() => setForm({ ...form, isActive: true })}
                    className="w-4 h-4 text-[#C62828]"
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={form.isActive === false}
                    onChange={() => setForm({ ...form, isActive: false })}
                    className="w-4 h-4 text-[#C62828]"
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/placements")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#C62828] hover:bg-[#8E0000] text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-all duration-300 disabled:opacity-60 flex items-center gap-2 shadow-lg hover:shadow-[#C62828]/30"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? "Update Placement" : "Create Placement"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}