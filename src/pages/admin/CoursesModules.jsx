import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";

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
    if (!confirm("Delete this module?")) return;
    try {
      await adminApi.delete(`/api/admin/courses/${slug}/modules/${id}`);
      const res = await adminApi.get(`/api/admin/courses/${slug}/modules`);
      setModules(res.data || []);
      setForm({ id: null, title: "", orderIndex: (modules.length || 0) + 1, content: "", videoUrl: "", quizText: "" });
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to delete" );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin")}
            className="text-sm font-bold text-red-700 hover:underline mb-2"
          >
            ← Back to dashboard
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900">Modules for: {slug}</h1>
          <p className="text-sm text-gray-600">Create/update/delete course modules</p>
        </div>

        {err && <div className="mb-4 text-red-700 text-sm">{err}</div>}

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 bg-white shadow rounded-lg p-4">
            <h2 className="font-bold text-gray-900 mb-4">{form.id ? "Edit" : "Add"} module</h2>

            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-700">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Order Index</label>
                <input
                  type="number"
                  value={form.orderIndex}
                  onChange={(e) => setForm((f) => ({ ...f, orderIndex: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Video URL</label>
                <input
                  value={form.videoUrl}
                  onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Quiz (JSON)</label>
                <textarea
                  value={form.quizText}
                  onChange={(e) => setForm((f) => ({ ...f, quizText: e.target.value }))}
                  rows={3}
                  placeholder='{"q":"..."}'
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white py-2.5 rounded-md font-bold transition disabled:opacity-60"
                disabled={!form.title.trim()}
              >
                {form.id ? "Update" : "Create"}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={() => setForm({ id: null, title: "", orderIndex: (modules.length || 0) + 1, content: "", videoUrl: "", quizText: "" })}
                  className="w-full bg-white border border-gray-300 text-gray-800 py-2.5 rounded-md font-bold hover:bg-gray-50 transition"
                >
                  Cancel edit
                </button>
              )}
            </form>
          </div>

          <div className="md:col-span-3 bg-white shadow rounded-lg p-4">
            <h2 className="font-bold text-gray-900 mb-4">Existing modules</h2>
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : modules.length === 0 ? (
              <div className="text-sm text-gray-500">No modules yet</div>
            ) : (
              <div className="space-y-3">
                {modules.map((m) => (
                  <div key={m.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-gray-900">{m.orderIndex}. {m.title}</div>
                        <div className="text-xs text-gray-500 mt-1">id: {m.id}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(m)}
                          className="text-xs font-bold text-red-700 hover:underline"
                        >Edit</button>
                        <button
                          onClick={() => onDelete(m.id)}
                          className="text-xs font-bold text-gray-700 hover:underline"
                        >Delete</button>
                      </div>
                    </div>
                    {m.content && (
                      <div className="text-sm text-gray-700 mt-2 whitespace-pre-wrap line-clamp-3">{m.content}</div>
                    )}
                    {m.videoUrl && (
                      <div className="text-xs text-blue-700 mt-2 break-all">{m.videoUrl}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

