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
        console.log('certificate data received:', res.data); // Debug log
        console.log('Meta data:', res.data.meta); // Debug log
        console.log('Photo URL:', res.data.meta?.photoUrl); // Debug log
        
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
      <AdminLayout title="certificate Preview" subtitle="Loading certificate...">
        <div className="p-6 text-gray-500">Loading...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="certificate Preview" subtitle="Error">
        <div className="p-6 text-red-700">{error}</div>
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
      <AdminLayout title="certificate Preview" subtitle="Not found">
        <div className="p-6 text-gray-500">certificate data unavailable.</div>
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
    // Already a full URL
    resolvedPhotoUrl = meta.photoUrl;
  } else if (meta.photoUrl.startsWith('/uploads/')) {
    // Relative path — prefix with API base URL so it doesn't resolve against the frontend origin
    resolvedPhotoUrl = resolveMediaUrl(meta.photoUrl);
  } else if (!meta.photoUrl.includes('/')) {
    // Just a filename — build the full relative path, then resolve it
    resolvedPhotoUrl = resolveMediaUrl(`/uploads/certificates/${meta.photoUrl}`);
  } else {
    // Fallback for any other shape
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
    <AdminLayout title="certificate Preview" subtitle="Print or download this certificate">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">certificate Preview</h2>
          <p className="text-sm text-gray-500">Print or save the certificate as PDF for the student.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-[#7B1C1C] hover:bg-[#5f1515] text-white font-bold px-4 py-2 rounded-lg"
        >
          Print / Save PDF
        </button>
      </div>

      <CertificateCard
        certificate={displaycertificate}
        qrValue={`certificate ${certificate.certificateNumber}`}
        printId="certificate-print"
      />

      <p className="mt-5 text-xs text-gray-400 text-center print:hidden">
        certificate ID: {certificate.certificateNumber} · Issued by Jawahar Global Foundation
      </p>

      <style>{`
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
  }

  @page {
    size: A4 landscape;
    margin: 0;
  }
}
      `}</style>
    </AdminLayout>
  );
}