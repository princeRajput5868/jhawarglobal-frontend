import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";
import ModuleViewer from "../components/Courses/ModuleViewer";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CourseLearn() {
  const { slug } = useParams();
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);

  const [modules, setModules] = useState([]);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/courses/${slug}/modules`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then((r) => r.json())
      .then((data) => setModules(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load modules"));
  }, [slug, visitorId]);

  const onComplete = async () => {
    setError(null);
    setSuccess(null);

    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    const res = await fetch(`${API}/api/courses/${slug}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-visitor-id": visitorId,
      },
      body: JSON.stringify({ fullName }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.message || "Completion failed" );
      return;
    }

    setCertificate(data.certificate || null);
    setSuccess("Course completed. Certificate generated!");
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold text-[#C62828]">Learn: {slug}</h1>
        <Link to={`/courses/${slug}`} className="text-sm font-bold text-red-700 hover:underline">
          Back to details
        </Link>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-700 font-bold mb-4">{success}</p>}

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ModuleViewer
            modules={modules}
            setModules={setModules}
            fullName={fullName}
            setFullName={setFullName}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Complete Course</h2>

            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-red-700"
            />

            <button
              onClick={onComplete}
              className="mt-4 w-full bg-[#C62828] hover:bg-[#8E0000] text-white font-bold py-2.5 rounded-md transition-colors"
            >
              Mark Complete & Generate Certificate
            </button>

            {certificate && (
              <div className="mt-5">
                <Link
                  to={`/certificates/${certificate.id}`}
                  className="inline-block w-full text-center border border-green-200 bg-green-50 text-green-800 font-bold py-2.5 rounded-md"
                >
                  View Certificate
                </Link>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
              You can complete after reading modules. (This demo doesn’t track quiz scores.)
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

