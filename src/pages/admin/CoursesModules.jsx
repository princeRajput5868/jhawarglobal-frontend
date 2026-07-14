import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Plus, Edit, Trash2, Save, X, Video, FileText, 
  List, ChevronRight, Play, BookOpen, Loader2, 
  AlertCircle, CheckCircle, ArrowLeft, Hash, 
  Code, ExternalLink, Eye
} from "lucide-react";

export default function AdminCourseModules() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const hasToken = useMemo(() => !!getAdminToken(), []);

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [form, setForm] = useState({
    id: null,
    title: "",
    orderIndex: 1,
    content: "",
    videoUrl: "",
    quizText: "",
  });

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }

    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await adminApi.get(`/api/admin/courses/${slug}/modules`);
        setModules(res.data || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load modules");
      } finally {
        setLoading(false);
      }
    })();
  }, [hasToken, slug, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      let quiz = null;
      if (form.quizText && form.quizText.trim()) {
        quiz = JSON.parse(form.quizText);
      }

      const payload = {
        id: form.id,
        title: form.title,
        orderIndex: Number(form.orderIndex),
        content: form.content,
        videoUrl: form.videoUrl || null,
        quiz,
      };

      await adminApi.post(`/api/admin/courses/${slug}/modules`, payload);
      const res = await adminApi.get(`/api/admin/courses/${slug}/modules`);
      setModules(res.data || []);
      setForm({ id: null, title: "", orderIndex: (modules.length || 0) + 1, content: "", videoUrl: "", quizText: "" });
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to save module");
    }
  };

  const onEdit = (m) => {
    setForm({
      id: m.id,
      title: m.title || "",
      orderIndex: m.orderIndex,
      content: m.content || "",
      videoUrl: m.videoUrl || "",
      quizText: m.quiz ? JSON.stringify(m.quiz, null, 2) : "",
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      await adminApi.delete(`/api/admin/courses/${slug}/modules/${id}`);
      const res = await adminApi.get(`/api/admin/courses/${slug}/modules`);
      setModules(res.data || []);
      setForm({ id: null, title: "", orderIndex: (modules.length || 0) + 1, content: "", videoUrl: "", quizText: "" });
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <AdminLayout 
      title={`Modules — ${slug}`} 
      subtitle="Create, update or delete course modules"
      actions={
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#7B1C1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      }
    >
      {err && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-semibold">Error</p>
            <p className="text-red-600 text-sm">{err}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form Section - 2 Columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.id ? 'bg-amber-50' : 'bg-[#7B1C1C]/10'}`}>
                {form.id ? (
                  <Edit className="w-5 h-5 text-amber-600" />
                ) : (
                  <Plus className="w-5 h-5 text-[#7B1C1C]" />
                )}
              </div>
              <div>
                <h3 className="font-sora font-bold text-gray-800 text-sm">
                  {form.id ? "Edit Module" : "Add New Module"}
                </h3>
                <p className="text-xs text-gray-500">
                  {form.id ? "Update module details" : "Create a new module for this course"}
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  Order Index
                </label>
                <input
                  type="number"
                  value={form.orderIndex}
                  onChange={(e) => setForm((f) => ({ ...f, orderIndex: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                  min="1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Module Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                  placeholder="e.g., Introduction to Mechanic"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition resize-none"
                  placeholder="Module content description..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  Video URL
                </label>
                <input
                  value={form.videoUrl}
                  onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/embed/..."
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                />
                {form.videoUrl && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
                    <ExternalLink className="w-3 h-3" />
                    <a href={form.videoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Preview Video
                    </a>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  Quiz (JSON)
                </label>
                <textarea
                  value={form.quizText}
                  onChange={(e) => setForm((f) => ({ ...f, quizText: e.target.value }))}
                  rows={3}
                  placeholder='{"questions": [{"q": "What is...", "options": ["A", "B"], "answer": "A"}]}'
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]/20 focus:border-[#7B1C1C] transition"
                />
                <p className="mt-1 text-[10px] text-gray-400">Valid JSON format with questions and answers</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!form.title.trim()}
                  className="flex-1 bg-[#7B1C1C] hover:bg-[#5f1515] text-white font-bold py-2.5 rounded-xl text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-[#7B1C1C]/30"
                >
                  {form.id ? (
                    <>
                      <Save className="w-4 h-4" />
                      Update Module
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Create Module
                    </>
                  )}
                </button>
                {form.id && (
                  <button
                    type="button"
                    onClick={() => setForm({ id: null, title: "", orderIndex: (modules.length || 0) + 1, content: "", videoUrl: "", quizText: "" })}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Modules List - 3 Columns */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <List className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-gray-800 text-sm">Existing Modules</h3>
                  <p className="text-xs text-gray-500">{modules.length} modules found</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                {loading ? "Loading..." : `${modules.length} total`}
              </span>
            </div>

            <div className="p-5">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-[#7B1C1C]" />
                    <span className="text-gray-500 text-sm">Loading modules...</span>
                  </div>
                </div>
              ) : modules.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">No modules yet</p>
                  <p className="text-xs text-gray-400 mt-1">Create your first module using the form</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {modules.map((m, index) => (
                    <div 
                      key={m.id} 
                      className="group border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-[#7B1C1C]/20"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#7B1C1C]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-[#7B1C1C]">{m.orderIndex}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-800 text-sm truncate">{m.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 mt-1">
                              <span className="text-[10px] text-gray-400 font-mono">ID: {m.id}</span>
                              {m.videoUrl && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-blue-600">
                                  <Video className="w-3 h-3" />
                                  Video
                                </span>
                              )}
                              {m.quiz && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-600">
                                  <FileText className="w-3 h-3" />
                                  Quiz
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => onEdit(m)} 
                            className="p-2 rounded-lg text-gray-400 hover:text-[#7B1C1C] hover:bg-[#7B1C1C]/10 transition-all duration-200"
                            title="Edit module"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onDelete(m.id)} 
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            title="Delete module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {m.content && (
                        <div className="mt-3 ml-11">
                          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap line-clamp-3">
                            {m.content}
                          </div>
                        </div>
                      )}
                      
                      {m.videoUrl && (
                        <div className="mt-2 ml-11">
                          <a 
                            href={m.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg transition"
                          >
                            <Play className="w-3 h-3" />
                            Watch Video
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats Footer */}
            {!loading && modules.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {modules.length} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    {modules.filter(m => m.videoUrl).length} Videos
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {modules.filter(m => m.quiz).length} Quizzes
                  </span>
                </div>
                <div className="text-[10px] text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </AdminLayout>
  );
}