import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { adminApi, setAdminToken } from "../../lib/adminApi";
import { 
  Lock, Mail, User, Eye, EyeOff, Shield, 
  ChevronRight, Sparkles, CheckCircle 
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/admin";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminApi.post("/api/admin/auth/login", { identifier, password });
      setAdminToken(res.data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Features List
  const features = [
    { icon: Shield, text: "Secure admin access" },
    { icon: CheckCircle, text: "Manage certificates" },
    { icon: Sparkles, text: "Track student progress" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      {/* Left Branding Panel - Red Theme */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#C62828] text-white flex-col justify-between overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 60%, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-20">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-black text-white text-lg shadow-lg border border-white/20">
              JGF
            </div>
            <div>
              <span className="font-bold tracking-wide text-lg block">Jawahar Global</span>
              <span className="text-xs text-white/60">Foundation</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white/90 text-xs font-bold uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>

              <h2 className="text-4xl font-sora font-extrabold leading-tight">
                Manage <span className="text-white/90">Your Platform</span>
              </h2>
              <p className="mt-4 text-white/80 text-base leading-relaxed max-w-sm">
                Manage courses, students and certificates from one professional dashboard.
                Everything you need in one place.
              </p>

              {/* Feature List */}
              <div className="mt-8 space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-xs text-white/50 mt-8">
            © {new Date().getFullYear()} Jawahar Global Foundation. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#C62828] flex items-center justify-center font-black text-white text-lg shadow-lg">
              JGF
            </div>
            <div>
              <span className="font-bold tracking-wide text-[#C62828] text-lg block">
                Jawahar Global
              </span>
              <span className="text-xs text-gray-400">Foundation</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#C62828]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#C62828]" />
                </div>
                <div>
                  <h1 className="text-2xl font-sora font-extrabold text-gray-900">Welcome Back</h1>
                </div>
              </div>
              <p className="text-sm text-gray-500 ml-14">
                Sign in to manage certificates and courses
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Username/Email Field */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Username or Email
                </label>
                <div className="mt-1.5 relative">
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-4 focus:ring-[#C62828]/10 focus:border-[#C62828] transition-all duration-300 bg-gray-50/50"
                    placeholder="Enter your username or email"
                    required
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-11 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-[#C62828]/10 focus:border-[#C62828] transition-all duration-300 bg-gray-50/50"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fadeIn">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C62828] hover:bg-[#8E0000] text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-[#C62828]/30 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Note */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                First time setup? Contact support to create your admin account.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <p className="mt-4 text-xs text-gray-400 text-center">
            Secure admin portal • Jawahar Global Foundation
          </p>
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
    </div>
  );
}