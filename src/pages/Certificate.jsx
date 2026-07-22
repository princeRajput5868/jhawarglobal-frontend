import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";
import CertificateCard from "../components/certificate/CertificateCard";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function certificate() {
  const { certificateId } = useParams();
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);
  const printRef = useRef(null);

  const [certificate, setcertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

  // Fetch certificate
  useEffect(() => {
    if (!certificateId) {
      setError("certificate ID is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API}/api/certificates/${certificateId}`, {
      headers: { 
        "x-visitor-id": visitorId,
        "Accept": "application/json"
      },
    })
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.message || "certificate not found");
        }
        return r.json();
      })
      .then((data) => {
        setcertificate(data);
        // Verify certificate if it has verification data
        if (data?.verificationId) {
          verifycertificate(data.verificationId);
        }
      })
      .catch((e) => {
        console.error("certificate fetch error:", e);
        setError(e?.message || "Failed to load certificate");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [certificateId, visitorId]);

  // Verify certificate authenticity
  const verifycertificate = async (verificationId) => {
    try {
      const response = await fetch(`${API}/api/certificates/verify/${verificationId}`, {
        headers: { "x-visitor-id": visitorId }
      });
      
      if (response.ok) {
        const data = await response.json();
        setVerificationStatus({
          verified: true,
          message: "certificate is authentic",
          verifiedAt: data.verifiedAt || new Date().toISOString()
        });
      } else {
        setVerificationStatus({
          verified: false,
          message: "certificate verification failed"
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle download as PDF
  const handleDownloadPDF = async () => {
    try {
      // Show loading state
      setLoading(true);
      
      // Open print dialog with save as PDF option
      window.print();
      
      // Alternative: Use html2canvas + jsPDF for better PDF generation
      // This is a simpler approach that uses the browser's print to PDF
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle share certificate
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `certificate - ${certificate?.fullName || "JGF certificate"}`,
        text: `View my certificate from Jawahar Global Foundation`,
        url: window.location.href,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Share error:", err);
        }
      });
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert("certificate link copied to clipboard!");
        })
        .catch(() => {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = window.location.href;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          alert("certificate link copied to clipboard!");
        });
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-[#7B1C1C] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your certificate...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-[#C62828] mb-3">certificate Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">
            The certificate you're looking for may have been removed or the URL is incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/certificates" 
              className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white px-6 py-2.5 rounded-lg font-medium transition"
            >
              ← My certificates
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

  // certificate not found
  if (!certificate) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-yellow-700 mb-3">No certificate Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find any certificate with this ID.
          </p>
          <Link 
            to="/certificates" 
            className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white px-6 py-2.5 rounded-lg font-medium transition inline-block"
          >
            ← My certificates
          </Link>
        </div>
      </main>
    );
  }

  // Main render with certificate
  return (
    <main className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Header with actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
        <Link 
          to="/certificates" 
          className="text-sm font-bold text-[#7B1C1C] hover:text-[#5f1515] hover:underline flex items-center gap-1 transition"
        >
          ← My certificates
        </Link>
        
        <div className="flex flex-wrap gap-2">
          {/* Verification badge */}
          {verificationStatus && verificationStatus.verified && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
          
          {/* Share button */}
          <button
            onClick={handleShare}
            className="text-sm font-medium border border-gray-200 hover:border-[#7B1C1C] hover:text-[#7B1C1C] px-4 py-2 rounded-lg transition-colors"
          >
            📤 Share
          </button>
          
          {/* Download PDF button */}
          <button
            onClick={handleDownloadPDF}
            className="text-sm font-medium border border-gray-200 hover:border-[#7B1C1C] hover:text-[#7B1C1C] px-4 py-2 rounded-lg transition-colors"
          >
            📥 Download PDF
          </button>
          
          {/* Print button */}
          <button
            onClick={handlePrint}
            className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white font-medium px-5 py-2 rounded-lg transition-colors"
          >
            🖨 Print / Save PDF
          </button>
        </div>
      </div>

      {/* certificate Card */}
      <div ref={printRef} className="flex justify-center overflow-x-auto">
        <CertificateCard 
          certificate={certificate} 
          qrValue={`${API}/api/certificates/${certificateId}`} 
          printId="certificate-print" 
        />
      </div>


      {/* Footer information */}
      <div className="mt-6 print:hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-400">
          <div>
            <p>certificate ID: <span className="font-mono">{certificate.certificateNumber}</span></p>
            <p>Issued by: Jawahar Global Foundation</p>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <p>Issued on: {new Date(certificate.issuedAt || Date.now()).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}</p>
            {verificationStatus && (
              <p className="text-green-600 font-medium">
                ✓ Verified & Authentic
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Print Styles — kept minimal so it doesn't conflict with CertificateCard's own
          built-in @media print rules (which already control exact sizing/border/padding).
          This mirrors the working admin preview page's print setup. */}
      <style>{`
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #certificate-print,
          #certificate-print * {
            visibility: visible;
          }
          #certificate-print {
            position: absolute;
            top: 0;
            left: 0;
          }
          @page {
            size: A4 landscape;
            margin: 0;
          }
        }
      `}</style>
    </main>
  );
}