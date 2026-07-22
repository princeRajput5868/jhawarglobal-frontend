import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Save, Loader2, AlertCircle, CheckCircle, 
  Award, Building, User, RefreshCw
} from "lucide-react";

export default function AdminSettings() {
  const navigate = useNavigate();
  const hasToken = !!getAdminToken();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [settings, setSettings] = useState({
    certificate_name: "Certificate",
    organization_name: "Jawahar Global Foundation",
    signatory_name: "Director",
  });

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }
    fetchSettings();
  }, [hasToken]);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.get("/api/admin/settings");
      const data = res.data;
      setSettings({
        certificate_name: data.certificate_name || "Certificate",
        organization_name: data.organization_name || "Jawahar Global Foundation",
        signatory_name: data.signatory_name || "Director",
      });
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load settings");
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
      for (const [key, value] of Object.entries(settings)) {
        await adminApi.put(`/api/admin/settings/${key}`, { value });
      }
      setSuccess("Settings updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Settings" subtitle="Loading...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#C62828]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Settings" 
      subtitle="Manage certificate/diploma settings"
      actions={
        <button
          onClick={fetchSettings}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C62828] transition px-3 py-2 rounded-xl hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-sora font-bold text-[#0B2545] text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F2A93B]" />
            Certificate Settings
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Customize how certificates/diplomas appear on your platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Certificate Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#F2A93B]" />
                Certificate/Diploma Name
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Choose what to display on certificates: "Certificate" or "Diploma"
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, certificate_name: "Certificate" })}
                  className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    settings.certificate_name === "Certificate"
                      ? "bg-[#C62828] text-white shadow-lg shadow-[#C62828]/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, certificate_name: "Diploma" })}
                  className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    settings.certificate_name === "Diploma"
                      ? "bg-[#C62828] text-white shadow-lg shadow-[#C62828]/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Diploma
                </button>
              </div>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700">
                  <span className="font-bold">Current:</span> All certificates will be displayed as 
                  <span className="font-bold text-[#C62828]"> {settings.certificate_name}</span>
                </p>
              </div>
            </div>

            {/* Organization Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#F2A93B]" />
                Organization Name
              </label>
              <input
                value={settings.organization_name}
                onChange={(e) => setSettings({ ...settings, organization_name: e.target.value })}
                className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition"
                placeholder="Organization name"
              />
            </div>

            {/* Signatory Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-[#F2A93B]" />
                Signatory Name
              </label>
              <input
                value={settings.signatory_name}
                onChange={(e) => setSettings({ ...settings, signatory_name: e.target.value })}
                className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition"
                placeholder="Director, Jawahar Global Foundation"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#C62828] hover:bg-[#8E0000] text-white font-bold px-8 py-3 rounded-xl text-sm transition-all duration-300 disabled:opacity-60 flex items-center gap-2 shadow-lg hover:shadow-[#C62828]/30"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-sora font-bold text-[#0B2545] text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F2A93B]" />
            Preview
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            How your certificate/diploma will look.
          </p>
        </div>
        <div className="p-6">
          <div className="max-w-md mx-auto bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
            <div className="text-4xl mb-3">📜</div>
            <h4 className="font-sora font-bold text-2xl text-[#0B2545]">
              {settings.certificate_name}
            </h4>
            <p className="text-gray-600 text-sm mt-2">
              Awarded by <span className="font-semibold">{settings.organization_name}</span>
            </p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Signatory: {settings.signatory_name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </AdminLayout>
  );
}