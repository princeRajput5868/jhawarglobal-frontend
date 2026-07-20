import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi, resolveMediaUrl } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import CertificateCard from "../../components/certificate/CertificateCard";

export default function AdmincertificatePreview() {
  const { certificateId } = useParams();
  const navigate = useNavigate();

  const [certificate, setcertificate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    const fetchcertificate = async () => {
      try {
        const res = await adminApi.get(`/api/admin/certificates/${certificateId}`);
        console.log('certificate data received:', res.data);
        console.log('Meta data:', res.data.meta);
        console.log('Photo URL:', res.data.meta?.photoUrl);
        
        setcertificate(res.data);
      } catch (e) {
        console.error('Error fetching certificate:', e);
        setError(e?.response?.data?.message || "Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };
    fetchcertificate();
  }, [certificateId]);

  const handlePhotoError = () => {
    setPhotoError(true);
    console.warn('Photo failed to load');
  };

  if (loading) {
    return (
      <AdminLayout title="Certificate Preview" subtitle="Loading certificate...">
        <div className="p-4 sm:p-6 text-gray-500">Loading...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Certificate Preview" subtitle="Error">
        <div className="p-4 sm:p-6 text-red-700">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#7B1C1C] text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </AdminLayout>
    );
  }

  if (!certificate) {
    return (
      <AdminLayout title="Certificate Preview" subtitle="Not found">
        <div className="p-4 sm:p-6 text-gray-500">Certificate data unavailable.</div>
      </AdminLayout>
    );
  }

  // Safely parse meta in case it's still a JSON string
  let meta = certificate.meta || {};
  if (typeof meta === 'string') {
    try {
      meta = JSON.parse(meta);
    } catch (e) {
      console.error('Failed to parse certificate.meta:', e);
      meta = {};
    }
  }

  // Enhanced photo URL resolution with fallback
  let resolvedPhotoUrl = null;
  if (meta.photoUrl) {
    if (meta.photoUrl.startsWith('http://') || meta.photoUrl.startsWith('https://')) {
      resolvedPhotoUrl = meta.photoUrl;
    } else if (meta.photoUrl.startsWith('/uploads/')) {
      resolvedPhotoUrl = resolveMediaUrl(meta.photoUrl);
    } else if (!meta.photoUrl.includes('/')) {
      resolvedPhotoUrl = resolveMediaUrl(`/uploads/certificates/${meta.photoUrl}`);
    } else {
      resolvedPhotoUrl = resolveMediaUrl(meta.photoUrl);
    }
  }

  console.log('Resolved photo URL:', resolvedPhotoUrl);

  const displaycertificate = {
    id: certificate.id,
    certificateNumber: certificate.certificateNumber,
    fullName: certificate.fullName,
    courseSlug: certificate.courseSlug,
    issuedAt: certificate.issuedAt,
    meta: {
      courseTitle: meta.courseTitle || certificate.courseSlug,
      signatoryName: meta.signatoryName || "Director, Jawahar Global Foundation",
      guardianRelation: meta.guardianRelation || "S/O",
      guardianName: meta.guardianName || "",
      dob: meta.dob || "",
      duration: meta.duration || "",
      grade: meta.grade || "",
      enrollmentNo: meta.enrollmentNo || certificate.certificateNumber,
      branchCode: meta.branchCode || "",
      place: meta.place || "",
      photoUrl: resolvedPhotoUrl,
      photoError: photoError,
    },
  };

  return (
    <AdminLayout title="Certificate Preview" subtitle="Print or download this certificate">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 print:hidden gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Certificate Preview</h2>
          <p className="text-xs sm:text-sm text-gray-500">Print or save the certificate as PDF for the student.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base w-full sm:w-auto"
        >
          🖨️ Print / Save PDF
        </button>
      </div>

      {/* Certificate Container - Sirf ek baar */}
      <div 
        className="certificate-scroll-wrapper"
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          WebkitOverflowScrolling: 'touch',
          padding: '10px 0',
          width: '100%',
        }}
      >
        <div 
          className="certificate-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minWidth: 'fit-content',
            width: '100%',
          }}
        >
          <CertificateCard
            certificate={displaycertificate}
            qrValue={`certificate ${certificate.certificateNumber}`}
            printId="certificate-print"
          />
        </div>
      </div>

      {/* Footer */}
      <p className="mt-4 sm:mt-5 text-xs text-gray-400 text-center print:hidden px-2">
        Certificate ID: {certificate.certificateNumber} · Issued by Jawahar Global Foundation
      </p>

      {/* Mobile Tip */}
      <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg print:hidden block sm:hidden">
        <p className="text-xs text-gray-600 text-center">
          💡 <span className="font-semibold">Tip:</span> Scroll horizontally to view full certificate. 
          Tap the Print button above to save as PDF.
        </p>
      </div>

      {/* Styles */}
      <style>{`
        /* Print Styles */
        @media print {
          html,
          body {
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
            width: 100% !important;
            height: auto !important;
          }

          @page {
            size: A4 landscape;
            margin: 0;
          }

          .print\\:hidden {
            display: none !important;
          }
        }

        /* Scrollbar Styling */
        .certificate-scroll-wrapper::-webkit-scrollbar {
          height: 6px;
        }

        .certificate-scroll-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .certificate-scroll-wrapper::-webkit-scrollbar-thumb {
          background: #7B1C1C;
          border-radius: 10px;
        }

        .certificate-scroll-wrapper::-webkit-scrollbar-thumb:hover {
          background: #5f1515;
        }

        /* Mobile Responsive Scaling */
        @media screen and (max-width: 480px) {
          #certificate-print {
            transform: scale(0.42);
            transform-origin: top left;
            width: 297mm !important;
            height: 210mm !important;
          }
          
          .certificate-wrapper {
            overflow: hidden !important;
            width: 100% !important;
            min-width: 297mm !important;
          }
          
          .certificate-scroll-wrapper {
            padding: 5px 0;
          }
        }

        @media screen and (min-width: 481px) and (max-width: 768px) {
          #certificate-print {
            transform: scale(0.55);
            transform-origin: top left;
            width: 297mm !important;
            height: 210mm !important;
          }
          
          .certificate-wrapper {
            overflow: hidden !important;
            width: 100% !important;
            min-width: 297mm !important;
          }
        }

        @media screen and (min-width: 769px) and (max-width: 1024px) {
          #certificate-print {
            transform: scale(0.75);
            transform-origin: top left;
            width: 297mm !important;
            height: 210mm !important;
          }
          
          .certificate-wrapper {
            overflow: hidden !important;
            width: 100% !important;
            min-width: 297mm !important;
          }
        }

        @media screen and (min-width: 1025px) {
          #certificate-print {
            transform: scale(1);
            transform-origin: top left;
            width: 297mm !important;
            height: 210mm !important;
          }
          
          .certificate-wrapper {
            width: auto !important;
            min-width: auto !important;
          }
        }

        /* Firefox Scrollbar */
        .certificate-scroll-wrapper {
          scrollbar-width: thin;
          scrollbar-color: #7B1C1C #f1f1f1;
        }
      `}</style>
    </AdminLayout>
  );
}