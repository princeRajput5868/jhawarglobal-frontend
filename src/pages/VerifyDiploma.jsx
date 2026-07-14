import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Search, Award, Calendar, User, Building, Loader2, Shield, FileCheck, Clock } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function VerifyDiploma() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!certificateId.trim()) {
      setError("Please enter a certificate ID");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API}/api/certificates/verify/${certificateId.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Certificate not found");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to verify certificate");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <section className="relative bg-[#0B2545] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(242,169,59,0.15),_transparent_55%)]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#F2A93B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F2A93B]/20 rounded-2xl mb-6 backdrop-blur-sm border border-[#F2A93B]/20">
            <Shield className="w-10 h-10 text-[#F2A93B]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-extrabold text-white mb-4">
            Verify a <span className="text-[#F2A93B]">Diploma</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Enter the certificate ID to verify the authenticity of a diploma
          </p>
          <div className="w-20 h-1 bg-[#F2A93B] rounded-full mx-auto mt-6" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search Form - Professional Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 lg:p-10 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-[#F2A93B]" />
            </div>
            <div>
              <h2 className="font-sora font-bold text-[#0B2545] text-lg">Verify Certificate</h2>
              <p className="text-gray-500 text-sm">Enter the unique certificate ID below</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="certificateId" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Certificate ID *
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="certificateId"
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., JGF-189312-F75E39"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/10 outline-none transition-all duration-300 bg-gray-50/50"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !certificateId.trim()}
                className="w-full sm:w-auto bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] font-bold py-3.5 px-10 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px] shadow-lg hover:shadow-[#F2A93B]/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Verify
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fadeIn">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold">Verification Failed</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Result Section - Professional Design */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 animate-fadeIn">
            {/* Status Banner */}
            <div className={`p-6 md:p-8 ${result.isValid ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200' : 'bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-200'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${result.isValid ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {result.isValid ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <div>
                  <h2 className={`text-2xl font-sora font-extrabold ${result.isValid ? 'text-green-700' : 'text-red-700'}`}>
                    {result.isValid ? 'Valid Certificate' : 'Invalid Certificate'}
                  </h2>
                  <p className={`text-sm ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isValid ? 'This certificate is authentic and verified' : 'This certificate could not be verified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            {result.isValid && result.data && (
              <div className="p-6 md:p-8 lg:p-10">
                <h3 className="text-lg font-sora font-bold text-[#0B2545] mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F2A93B]" />
                  Certificate Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <User className="w-5 h-5 text-[#F2A93B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</p>
                        <p className="text-gray-800 font-semibold">{result.data.studentName || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Award className="w-5 h-5 text-[#F2A93B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course</p>
                        <p className="text-gray-800 font-semibold">{result.data.courseTitle || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-[#F2A93B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Issue Date</p>
                        <p className="text-gray-800 font-semibold">
                          {result.data.issueDate ? new Date(result.data.issueDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Building className="w-5 h-5 text-[#F2A93B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Certificate ID</p>
                        <p className="text-gray-800 font-mono text-sm font-bold">{result.data.certificateId || certificateId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Badge - Professional */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                    <div className="w-3 h-3 bg-green-500 rounded-full relative" />
                  </div>
                  <span className="text-green-700 font-medium text-sm">
                    Verified on {new Date().toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions - Professional Design */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#F2A93B]" />
              </div>
              <h3 className="font-sora font-bold text-[#0B2545] text-lg">How to verify?</h3>
            </div>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F2A93B]/10 text-[#F2A93B] rounded-full text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                Enter the certificate ID from your diploma
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F2A93B]/10 text-[#F2A93B] rounded-full text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                Click "Verify" to check authenticity
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F2A93B]/10 text-[#F2A93B] rounded-full text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                View certificate details or error message
              </li>
            </ol>
          </div>

          <div className="bg-[#0B2545] rounded-2xl shadow-sm p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#F2A93B]/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#F2A93B]" />
              </div>
              <h3 className="font-sora font-bold text-lg">Need help?</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              If you have lost your certificate ID, please contact our support team for assistance.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#F2A93B] font-semibold text-sm hover:text-white transition-colors"
            >
              Contact Support
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F2A93B] transition-all duration-300 font-medium group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}