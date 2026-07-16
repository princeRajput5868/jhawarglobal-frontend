import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Save, ArrowLeft, Loader2, AlertCircle, CheckCircle,
  BookOpen, User, Clock, Tag, Globe, Plus, X
} from "lucide-react";

export default function AdminCourseForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const hasToken = !!getAdminToken();
  const isEditing = !!slug;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    level: "",
    durationHours: "",
    coverImageUrl: "",
    isActive: true,
    features: [],
  });

  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }
    if (isEditing) {
      fetchCourse();
    }
  }, [hasToken, isEditing]);

  const fetchCourse = async () => {
    try {
      const res = await adminApi.get(`/api/admin/courses/${slug}`);
      const data = res.data;
      setForm({
        slug: data.slug || "",
        title: data.title || "",
        description: data.description || "",
        level: data.level || "",
        durationHours: data.durationHours || "",
        coverImageUrl: data.coverImageUrl || "",
        isActive: data.isActive !== undefined ? data.isActive : true,
        features: data.features || [],
      });
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...form,
        durationHours: form.durationHours ? Number(form.durationHours) : null,
      };

      if (isEditing) {
        await adminApi.put(`/api/admin/courses/${slug}`, payload);
        setSuccess("Course updated successfully!");
      } else {
        await adminApi.post("/api/admin/courses", payload);
        setSuccess("Course created successfully!");
        setTimeout(() => navigate("/admin/courses"), 1500);
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEditing ? "Edit Course" : "Add Course"} subtitle="Loading...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#7B1C1C]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={isEditing ? "Edit Course" : "Add Course"} 
      subtitle={isEditing ? "Update course details" : "Create a new training program"}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/courses")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#7B1C1C] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
          {isEditing && (
            <span className="text-xs text-gray-400">Slug: {slug}</span>
          )}
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
                <Tag className="w-3.5 h-3.5" />
                Slug *
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                placeholder="e.g. mechanic-basics"
                required
                disabled={isEditing}
              />
              {isEditing && (
                <p className="mt-1 text-xs text-gray-400">Slug cannot be changed</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                placeholder="Course title"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition resize-none"
                placeholder="Course description"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Level</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Duration (Hours)
              </label>
              <input
                type="number"
                value={form.durationHours}
                onChange={(e) => setForm({ ...form, durationHours: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                placeholder="e.g. 40"
                min="1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Cover Image URL
              </label>
              <input
                value={form.coverImageUrl}
                onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Features</label>
              <div className="flex gap-2 mt-1.5">
                <input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2.5 bg-[#7B1C1C] text-white rounded-xl text-sm font-bold hover:bg-[#5f1515] transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-[#7B1C1C]/10 text-[#7B1C1C] px-3 py-1.5 rounded-full text-xs font-semibold"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:text-[#5f1515]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
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
                    className="w-4 h-4 text-[#7B1C1C]"
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    checked={form.isActive === false}
                    onChange={() => setForm({ ...form, isActive: false })}
                    className="w-4 h-4 text-[#7B1C1C]"
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-all duration-300 disabled:opacity-60 flex items-center gap-2 shadow-lg hover:shadow-[#7B1C1C]/30"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? "Update Course" : "Create Course"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}