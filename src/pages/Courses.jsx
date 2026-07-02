import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    fetch(`${API}/api/courses`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch((e) => setError(e?.message || "Failed to load courses"));
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[#C62828] mb-2">Courses</h1>
      {error && <p className="text-red-600 text-sm mb-6">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c) => (
          <Link
            key={c.slug}
            to={`/courses/${c.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-44 overflow-hidden bg-gray-100">
              {c.coverImageUrl && (
                <img
                  src={c.coverImageUrl}
                  alt={c.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="font-extrabold text-gray-900 text-sm line-clamp-2">{c.title}</h2>
              {c.level && (
                <p className="text-xs text-gray-500 mt-1">Level: {c.level}</p>
              )}
              {typeof c.durationHours === "number" && (
                <p className="text-xs text-gray-500">Duration: {c.durationHours} hours</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && !error && (
        <p className="text-gray-600 mt-8">No courses found.</p>
      )}
    </main>
  );
}

