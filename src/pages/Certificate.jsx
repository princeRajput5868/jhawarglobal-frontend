import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";
import CertificateCard from "../components/certificate/CertificateCard";
import { adminApi } from "../lib/adminApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Certificate() {
  const { certificateId } = useParams();
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);
  const printRef = useRef(null);

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [certificateName, setCertificateName] = useState("Diploma");

  // ✅ Fetch certificate name from settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await adminApi.get("/api/admin/settings");
        const data = res.data;
        setCertificateName(data.certificate_name || "Diploma");
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        setCertificateName("Diploma");
      }
    };
    fetchSettings();
  }, []);

  // ✅ Fetch certificate
  useEffect(() => {
    if (!certificateId) {
      setError("Certificate ID is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    console.log("📡 Fetching certificate:", `${API}/api/certificates/${certificateId}`);

    fetch(`${API}/api/certificates/${certificateId}`, {
      headers: { 
        "x-visitor-id": visitorId,
        "Accept": "application/json"
      },
    })
      .then(async (r) => {
        console.log("📡 Response status:", r.status);
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.message || "Certificate not found");
        }
        return r.json();
      })
      .then((data) => {
        console.log("📡 Certificate data:", data);
        setCertificate(data);
        if (data?.certificateNumber) {
          verifyCertificate(data.certificateNumber);
        }
      })
      .catch((e) => {
        console.error("❌ Certificate fetch error:", e);
        setError(e?.message || "Failed to load certificate");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [certificateId, visitorId]);

  // ✅ Verify certificate
  const verifyCertificate = async (verificationId) => {
    try {
      console.log("🔍 Verifying certificate:", verificationId);
      const response = await fetch(`${API}/api/certificates/verify/${verificationId}`, {
        headers: { "x-visitor-id": visitorId }
      });
      
      if (response.ok) {
        const data = await response.json();
        setVerificationStatus({
          verified: true,
          message: "Certificate is authentic",
          verifiedAt: data.verifiedAt || new Date().toISOString(),
          data: data
        });
      } else {
        setVerificationStatus({
          verified: false,
          message: "Certificate verification failed"
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificateName} - ${certificate?.fullName || "JGF Certificate"}`,
        text: `View my ${certificateName} from Jawahar Global Foundation`,
        url: window.location.href,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Share error:", err);
        }
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert(`${certificateName} link copied to clipboard!`);
        })
        .catch(() => {
          const textarea = document.createElement('textarea');
          textarea.value = window.location.href;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          alert(`${certificateName} link copied to clipboard!`);
        });
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-[#F2A93B] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your {certificateName.toLowerCase()}...</p>
        </div>
      </main>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-[#C62828] mb-3">{certificateName} Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">
            The {certificateName.toLowerCase()} you're looking for may have been removed or the URL is incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/certificates" 
              className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white px-6 py-2.5 rounded-lg font-medium transition"
            >
              ← My {certificateName}s
            </Link>
            <Link 
              to="/" 
              className="border border-gray-300 hover:border-[#7B1C1C] hover:text-[#7B1C1C] px-6 py-2.5 rounded-lg font-medium transition"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ✅ No Certificate Found
  if (!certificate) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-yellow-700 mb-3">No {certificateName} Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find any {certificateName.toLowerCase()} with this ID.
          </p>
          <Link 
            to="/certificates" 
            className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white px-6 py-2.5 rounded-lg font-medium transition inline-block"
          >
            ← My {certificateName}s
          </Link>
        </div>
      </main>
    );
  }

  // ✅ Main Render
  return (
    <>
      {/* ✅ Header with actions - Hidden on Print */}
      <div className="print:hidden">
        <main className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Link 
              to="/certificates" 
              className="text-sm font-bold text-[#7B1C1C] hover:text-[#5f1515] hover:underline flex items-center gap-1 transition"
            >
              ← My {certificateName}s
            </Link>
            
            <div className="flex flex-wrap gap-2">
              {verificationStatus && verificationStatus.verified && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
              
              <button
                onClick={handleShare}
                className="text-sm font-medium border border-gray-200 hover:border-[#7B1C1C] hover:text-[#7B1C1C] px-4 py-2 rounded-lg transition-colors"
              >
                📤 Share
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="text-sm font-medium border border-gray-200 hover:border-[#7B1C1C] hover:text-[#7B1C1C] px-4 py-2 rounded-lg transition-colors"
              >
                📥 Download PDF
              </button>
              
              <button
                onClick={handlePrint}
                className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white font-medium px-5 py-2 rounded-lg transition-colors"
              >
                🖨 Print / Save PDF
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ✅ ONLY CERTIFICATE CARD - NO EXTRA CONTENT */}
      <div id="certificate-print-wrapper" ref={printRef}>
        <CertificateCard 
          certificate={certificate} 
          qrValue={`${API}/api/certificates/${certificateId}`} 
          printId="certificate-print" 
        />
      </div>

      {/* ✅ Footer - Hidden on Print */}
      <div className="print:hidden">
        <main className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-400">
              <div>
                <p>{certificateName} ID: <span className="font-mono">{certificate.certificateNumber}</span></p>
                <p>Issued by: Jawahar Global Foundation</p>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <p>Issued on: {new Date(certificate.issuedAt || Date.now()).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}</p>
                {verificationStatus && verificationStatus.verified && (
                  <p className="text-green-600 font-medium">
                    ✓ Verified & Authentic
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ✅ Print Styles - FIXED for single print */}
      <style>{`
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          /* Hide ALL body content */
          body * {
            visibility: hidden !important;
          }
          
          /* Show ONLY certificate wrapper */
          #certificate-print-wrapper,
          #certificate-print-wrapper * {
            visibility: visible !important;
          }
          
          #certificate-print-wrapper {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 99999 !important;
            background: white !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          /* Hide print button and other UI */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Ensure CertificateCard is visible */
          #certificate-print {
            display: block !important;
            visibility: visible !important;
          }
          
          #certificate-print * {
            visibility: visible !important;
          }
        }
        
        @page {
          size: A4 landscape;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}