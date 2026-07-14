import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams }from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ FALLBACK COURSES WITH ALL IMAGES
const FALLBACK_COURSES = [
  {
    id: 1,
    slug: "mechanic",
    title: "Mechanic Basics",
    description: "Hands-on workshop with real vehicle practice and placement assistance.",
    level: "Beginner Friendly",
    durationHours: 40,
    coverImageUrl: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    slug: "electrician",
    title: "Electrician Fundamentals",
    description: "Understand electrical safety, basic tools, wiring concepts, and safe troubleshooting approach.",
    level: "Beginner",
    durationHours: 8,
    coverImageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
  },
  {
    id: 3,
    slug: "parlour",
    title: "Parlour Skills",
    description: "A structured course on skin/hair care routines, safety, and professional service standards.",
    level: "Beginner",
    durationHours: 6,
    // ✅ PARLOUR IMAGE - CHHOTI KAR DI
    coverImageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=200&fit=crop&q=80",
  },
  {
    id: 4,
    slug: "salon",
    title: "Salon Skills",
    description: "Styling fundamentals with real client practice.",
    level: "Beginner Friendly",
    durationHours: 40,
    coverImageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
  },
];

export default function CourseDetail() {
  const { slug } = useParams();
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const fallback = FALLBACK_COURSES.find(f => f.slug === slug);
    if (fallback) {
      setCourse(fallback);
    }

    fetch(`${API}/api/courses/${slug}`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error("Course not found");
        }
        return r.json();
      })
      .then((data) => {
        setCourse({
          ...data,
          coverImageUrl: fallback?.coverImageUrl || data.coverImageUrl,
          description: data.description || fallback?.description,
          level: data.level || fallback?.level,
          durationHours: data.durationHours || fallback?.durationHours,
        });
        setLoading(false);
      })
      .catch((e) => {
        console.warn("API failed, using fallback:", e.message);
        setLoading(false);
      });
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

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#F2A93B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading course...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !course) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#C62828]">Course Not Found</h1>
          <p className="mt-3 text-gray-600">{error}</p>
          <Link to="/courses" className="mt-6 inline-block bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] px-6 py-3 rounded-lg font-bold text-sm transition-colors">
            Browse All Courses
          </Link>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-gray-600">Course not found</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Hero */}
      <section className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B2545]">{course.title}</h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {course.level && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F2A93B]/10 text-[#0B2545] border border-[#F2A93B]/20">
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
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold bg-[#0B2545] hover:bg-[#1a3a6e] text-white transition-colors"
              >
                Start Learning
              </Link>
              <Link
                to={`/courses/${slug}/learn`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold border-2 border-gray-200 hover:border-[#0B2545] hover:text-[#0B2545] text-gray-700 transition-colors"
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
                onError={(e) => {
                  const fallback = FALLBACK_COURSES.find(f => f.slug === slug);
                  if (fallback?.coverImageUrl) {
                    e.target.src = fallback.coverImageUrl;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full min-h-[220px] flex items-center justify-center text-gray-400 bg-gradient-to-br from-[#0B2545]/5 to-[#0B2545]/10">
                <div className="text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <span className="text-sm">No cover image</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content + Sticky Sidebar */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10 items-start">
        <div className="lg:col-span-2">
          <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-extrabold text-gray-900">What you will learn</h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              This course includes structured modules with practical learning content. Use the syllabus below to explore each topic.
            </p>

            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#F2A93B]/10 border border-[#F2A93B]/20">
                <div className="text-xs font-bold text-[#0B2545] uppercase">Includes</div>
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

          <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mt-6">
            <h2 className="text-xl font-extrabold text-gray-900">Syllabus</h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              For complete module-wise content and videos, open the learning page.
            </p>

            <Link
              to={`/courses/${slug}/learn`}
              className="mt-4 inline-flex items-center justify-center w-full px-5 py-3 rounded-lg font-bold border-2 border-gray-200 hover:border-[#0B2545] hover:text-[#0B2545] text-gray-700 transition-colors"
            >
              Open Module List
            </Link>
          </section>

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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#0B2545] focus:ring-2 focus:ring-[#0B2545]/20 transition"
            />

            <button
              onClick={onEnroll}
              className="mt-4 w-full bg-[#0B2545] hover:bg-[#1a3a6e] text-white font-bold py-2.5 rounded-lg transition-colors"
            >
              Enroll
            </button>

            <div className="mt-4 text-sm text-gray-600">
              {enrollment?.status === "completed" ? (
                <p className="font-bold text-green-700">Course completed. Your certificate is ready.</p>
              ) : enrollment?.status === "in_progress" ? (
                <p className="font-bold text-[#F2A93B]">Enrollment saved. Start learning below.</p>
              ) : (
                <p>Enroll to start modules and generate your certificate after completion.</p>
              )}
            </div>

            <Link
              to={`/courses/${slug}/learn`}
              className="inline-block mt-4 w-full text-center border-2 border-gray-200 hover:border-[#0B2545] hover:text-[#0B2545] text-gray-700 font-bold py-2.5 rounded-lg transition-colors"
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