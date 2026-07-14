import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Mycertificates() {
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);
  const [certificates, setcertificates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/certificates/me`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then((r) => r.json())
      .then((data) => setcertificates(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load certificates"));
  }, [visitorId]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[#C62828] mb-2">My certificates</h1>
      {error && <p className="text-red-600 text-sm mb-6">{error}</p>}

      <div className="space-y-4">
        {certificates.map((c) => (
          <Link
            key={c.id}
            to={`/certificates/${c.id}`}
            className="block bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="font-extrabold text-gray-900">{c.courseSlug}</div>
            <div className="text-sm text-gray-600">{c.fullName}</div>
            <div className="text-xs text-gray-500 mt-2">certificate #: {c.certificateNumber}</div>
          </Link>
        ))}

        {certificates.length === 0 && !error && (
          <p className="text-gray-600 mt-6">No certificates yet. Complete a course to generate one.</p>
        )}
      </div>
    </main>
  );
}

