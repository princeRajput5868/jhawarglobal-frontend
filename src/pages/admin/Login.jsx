import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi, setAdminToken } from "../../lib/adminApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.post("/api/admin/auth/login", { identifier, password });

      setAdminToken(res.data.token);
      navigate("/admin");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-6">Manage courses and content</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Username or Email</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {error && <div className="text-sm text-red-700">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 text-white py-2.5 rounded-md font-bold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-5 text-xs text-gray-500">
          Tip: if you didn’t create an admin yet, call <span className="font-semibold">/api/admin/auth/seed</span>
          from Postman once.
        </div>
      </div>
    </div>
  );
}

