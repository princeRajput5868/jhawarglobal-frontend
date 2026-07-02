import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CourseDetail() {
  const { slug } = useParams();
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/courses/${slug}`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.message || "Course not found");
        }
        return r.json();
      })
      .then(setCourse)
      .catch((e) => setError(e?.message || "Failed to load course"));
  }, [slug, visitorId]);

  const onEnroll = async () => {
    setError(null);
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    const res = await fetch(`${API}/api/courses/${slug}/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-visitor-id": visitorId,
      },
      body: JSON.stringify({ fullName }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.message || "Enrollment failed");
      return;
    }

    setEnrollment(data.enrollment || null);
  };

  if (error) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#C62828]">Error</h1>
        <p className="mt-3 text-gray-600">{error}</p>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Hero */}
      <section className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#C62828]">{course.title}</h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {course.level && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                  {course.level}
                </span>
              )}
              {typeof course.durationHours === "number" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-100">
                  {course.durationHours} hours
                </span>
              )}
            </div>

            {course.description && (
              <p className="mt-5 text-gray-700 leading-relaxed text-sm md:text-base">
                {course.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/courses/${slug}/learn`}
                className="inline-flex items-center justify-center px-5 py-3 rounded-md font-bold bg-[#C62828] hover:bg-[#8E0000] text-white transition-colors"
              >
                Start Learning
              </Link>
              <Link
                to={`/courses/${slug}/learn`}
                className="inline-flex items-center justify-center px-5 py-3 rounded-md font-bold border border-gray-200 hover:border-red-700 hover:text-red-700 text-gray-800 transition-colors"
              >
                View Syllabus
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 bg-gray-50">
            {course.coverImageUrl ? (
              <img
                src={course.coverImageUrl}
                alt={course.title}
                className="w-full h-full min-h-[220px] object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[220px] flex items-center justify-center text-gray-400">
                No cover image
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content + Sticky Sidebar */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10 items-start">
        <div className="lg:col-span-2">
          {/* Highlights / What you'll learn placeholder */}
          <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-extrabold text-gray-900">What you will learn</h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              This course includes structured modules with practical learning content. Use the syllabus below to explore each topic.
            </p>

            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Includes</div>
                <div className="text-sm font-extrabold text-gray-900 mt-1">Reading & Steps</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-xs font-bold text-gray-700 uppercase">Format</div>
                <div className="text-sm font-extrabold text-gray-900 mt-1">Module-based learning</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-xs font-bold text-gray-700 uppercase">Certificate</div>
                <div className="text-sm font-extrabold text-gray-900 mt-1">On completion</div>
              </div>
            </div>
          </section>

          {/* Syllabus (modules) placeholder: currently routed to CourseLearn for full syllabus */}
          <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mt-6">
            <h2 className="text-xl font-extrabold text-gray-900">Syllabus</h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              For complete module-wise content and videos, open the learning page.
            </p>

            <Link
              to={`/courses/${slug}/learn`}
              className="mt-4 inline-flex items-center justify-center w-full px-5 py-3 rounded-md font-bold border border-gray-200 hover:border-red-700 hover:text-red-700 text-gray-800 transition-colors"
            >
              Open Module List
            </Link>
          </section>

          {/* FAQ placeholder */}
          <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mt-6">
            <h2 className="text-xl font-extrabold text-gray-900">FAQs</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900">When do I get a certificate?</div>
                <div className="text-gray-600 mt-1">After you complete the course from the learning page.</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900">Do I need an account?</div>
                <div className="text-gray-600 mt-1">No. This project uses a visitor id stored in your browser.</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900">Can I resume later?</div>
                <div className="text-gray-600 mt-1">Yes—your enrollment status is saved as you continue.</div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Enroll</h2>

            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-red-700"
            />

            <button
              onClick={onEnroll}
              className="mt-4 w-full bg-[#C62828] hover:bg-[#8E0000] text-white font-bold py-2.5 rounded-md transition-colors"
            >
              Enroll
            </button>

            <div className="mt-4 text-sm text-gray-600">
              {enrollment?.status === "completed" ? (
                <p className="font-bold text-green-700">Course completed. Your certificate is ready.</p>
              ) : enrollment?.status === "in_progress" ? (
                <p className="font-bold text-yellow-700">Enrollment saved. Start learning below.</p>
              ) : (
                <p>Enroll to start modules and generate your certificate after completion.</p>
              )}
            </div>

            <Link
              to={`/courses/${slug}/learn`}
              className="inline-block mt-4 w-full text-center border border-gray-200 hover:border-red-700 hover:text-red-700 text-gray-800 font-bold py-2.5 rounded-md transition-colors"
            >
              Go to Course
            </Link>

            <div className="mt-4 text-xs text-gray-500">
              Note: This project uses a simple visitor id stored in your browser.
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

