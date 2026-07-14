import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── FALLBACK DATA ─────────────────────────────────────────────
const FALLBACK_COURSES = [
  {
    id: 1,
    slug: "mechanic",
    title: "Mechanic Basics",
    duration: "Service & Diagnostics",
    level: "Beginner Friendly",
    features: [
      "Hands-on Workshop",
      "Real Vehicle Practice",
      "Placement Assistance",
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    slug: "electrician",
    title: "Electrician Fundamentals",
    duration: "Safety First",
    level: "Beginner Friendly",
    features: [
      "Safety Certification",
      "Live Wiring Practice",
      "Placement Assistance",
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
  },
  {
    id: 3,
    slug: "parlour",
    title: "Parlour Skills",
    duration: "Care & Customer Experience",
    level: "Beginner Friendly",
    features: [
      "Client Handling Practice",
      "Hygiene & Care Techniques",
      "Placement Assistance",
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
  },
  {
    id: 4,
    slug: "salon",
    title: "Salon Skills",
    duration: "Basics to Employability",
    level: "Beginner Friendly",
    features: [
      "Styling Fundamentals",
      "Real Client Practice",
      "Placement Assistance",
    ],
    coverImageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
  },
];

const FALLBACK_STATS = [
  { number: 4500, suffix: "+", label: "Students Trained" },
  { number: 350, suffix: "+", label: "Hiring Partners" },
  { number: 12, suffix: "", label: "Training Centres" },
  { number: 96, suffix: "%", label: "Placement Rate" },
];

const FALLBACK_PLACEMENTS = [
  { id: 1, name: "Ritika Sharma", role: "Web Developer", company: "Placed — Noida", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { id: 2, name: "Aman Verma", role: "Digital Marketing Executive", company: "Placed — Delhi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { id: 3, name: "Suresh Kumar", role: "Electrical Technician", company: "Placed — Ghaziabad", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { id: 4, name: "Priya Singh", role: "Accounts Executive", company: "Placed — Meerut", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: "Ritika Sharma",
    place: "Noida",
    message: "The trainers made every concept practical from day one. I built real projects during the course, and that portfolio is exactly what got me hired.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    name: "Suresh Kumar",
    place: "Ghaziabad",
    message: "Hands-on workshop sessions gave me confidence I couldn't get from books alone. The placement team followed up until I actually had an offer in hand.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: 3,
    name: "Priya Singh",
    place: "Meerut",
    message: "Batch timings were flexible around my schedule, and the Diploma I earned is recognised by every employer I've spoken to since.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

const UPCOMING_BATCHES = [
  "Web Development — Batch starts July 8, 10 AM",
  "Digital Marketing — Demo class July 6, 7 PM",
  "Electrical Technician — Batch starts July 10, 2 PM",
  "Tally & Accounting — Demo class July 9, 6 PM",
  "Web Development — Online Batch July 14, 7 PM",
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

function useFetch(endpoint, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    fetch(`${API}${endpoint}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.length > 0) setData(res.data);
      })
      .catch(() => {});
  }, [endpoint]);
  return data;
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [value, ref];
}

// ─── SECTIONS ───────────────────────────────────────────────────────────────

// 1. HERO - Professional Design
function Hero({ courseCount }) {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0B2545] overflow-hidden font-inter">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(242,169,59,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(242,169,59,0.08),_transparent_50%)]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#F2A93B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F2A93B]/10 border border-[#F2A93B]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#F2A93B] rounded-full animate-pulse" />
              <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-wider">
                Skill Training & Certification
              </span>
            </div>

            <h1 className="font-sora font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
              Learn a skill.
              <br />
              <span className="text-[#F2A93B]">Earn a career.</span>
            </h1>

            <p className="text-slate-300 mt-6 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Hands-on vocational training in web development, digital marketing, and
              technical trades — with mentor-led projects and placement support at every step.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] px-8 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[#F2A93B]/30"
              >
                Explore Courses
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/verify-diploma"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                Verify a Diploma
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-white font-sora font-extrabold text-3xl">{courseCount}+</div>
                <div className="text-slate-400 text-xs mt-1">Active Courses</div>
              </div>
              <div className="text-center">
                <div className="text-white font-sora font-extrabold text-3xl">96%</div>
                <div className="text-slate-400 text-xs mt-1">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-white font-sora font-extrabold text-3xl">12</div>
                <div className="text-slate-400 text-xs mt-1">Centres</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students in a hands-on training session"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/50 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-5 py-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F2A93B]/20 flex items-center justify-center text-[#F2A93B] font-bold text-lg">✓</div>
                <div>
                  <div className="text-[#0B2545] font-sora font-bold text-sm">Diploma</div>
                  <div className="text-slate-500 text-xs">on completion</div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl px-4 py-3 hidden lg:block">
              <div className="text-center">
                <div className="text-[#F2A93B] font-sora font-extrabold text-xl">100%</div>
                <div className="text-slate-500 text-[10px]">Practical Training</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. UPCOMING BATCHES TICKER
function BatchTicker() {
  const doubled = [...UPCOMING_BATCHES, ...UPCOMING_BATCHES];
  return (
    <div className="bg-[#F2A93B] py-3 overflow-hidden border-y border-[#e0993a]/20">
      <div className="flex gap-12 md:gap-16 animate-marquee whitespace-nowrap font-inter">
        {doubled.map((item, i) => (
          <span key={i} className="text-[#0B2545] text-xs sm:text-sm font-bold flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// 3. COURSES GRID - Professional Design
function CoursesSection({ courses }) {
  const navigate = useNavigate();

  const goToCourse = (slug) => {
    navigate(`/courses/${slug}`);
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-widest bg-[#F2A93B]/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Courses
          </span>
          <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-[#0B2545]">
            Choose your training track
          </h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Industry-focused programs designed to build practical skills and accelerate your career
          </p>
          <div className="w-16 h-1 bg-[#F2A93B] rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {courses.map((c) => (
            <div
              key={c.id || c.slug}
              role="button"
              tabIndex={0}
              onClick={() => goToCourse(c.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  goToCourse(c.slug);
                }
              }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer border border-slate-100 hover:border-[#F2A93B]/40 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden relative">
                {c.coverImageUrl ? (
                  <img
                    src={c.coverImageUrl}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0B2545]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {c.duration && (
                  <span className="absolute top-4 left-4 bg-[#0B2545]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10">
                    {c.duration}
                  </span>
                )}
                {c.level && (
                  <span className="absolute top-4 right-4 bg-[#F2A93B]/90 backdrop-blur-sm text-[#0B2545] text-[11px] font-bold px-3 py-1.5 rounded-full">
                    {c.level}
                  </span>
                )}
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="font-sora font-bold text-[#0B2545] text-lg leading-snug mb-1">
                  {c.title}
                </h3>
                <ul className="space-y-2 mt-3 mb-5 flex-1">
                  {(c.features || []).slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="text-[#F2A93B] font-bold mt-0.5 text-lg">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/courses/${c.slug}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCourse(c.slug);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      goToCourse(c.slug);
                    }
                  }}
                  className="inline-flex items-center justify-center bg-[#0B2545] hover:bg-[#F2A93B] hover:text-[#0B2545] text-white text-sm font-bold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-[#0B2545] font-bold hover:text-[#F2A93B] transition-colors group"
          >
            View all courses
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// 4. STATS COUNTER - Professional Design
function StatCard({ stat }) {
  const [value, ref] = useCountUp(stat.number);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl lg:text-6xl font-sora font-extrabold text-white group-hover:text-[#F2A93B] transition-colors duration-500">
        {value.toLocaleString("en-IN")}
        {stat.suffix}
      </div>
      <div className="text-slate-300 text-sm mt-2 group-hover:text-white transition-colors duration-500">
        {stat.label}
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-[#0B2545] font-inter relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(242,169,59,0.05),_transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
        {FALLBACK_STATS.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

// 5. STUDENTS PLACED CAROUSEL - Professional Design
function PlacedStudents({ placements }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-widest bg-[#F2A93B]/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Success Stories
            </span>
            <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-[#0B2545]">
              Students placed recently
            </h2>
            <p className="text-slate-500 mt-2">Real results from real training</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              →
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {placements.map((p) => (
            <div
              key={p.id}
              className="shrink-0 w-64 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 p-6 flex flex-col items-center text-center hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#F2A93B]/30 group-hover:border-[#F2A93B] transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="font-sora font-bold text-[#0B2545] text-base mt-3">{p.name}</div>
              <div className="text-[#F2A93B] text-xs font-semibold mt-1">{p.role}</div>
              <div className="text-slate-400 text-xs mt-2 bg-gray-50 px-3 py-1 rounded-full">{p.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. TESTIMONIALS - Professional Design
function TestimonialsSection({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-gray-50 font-inter">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-widest bg-[#F2A93B]/10 px-4 py-1.5 rounded-full inline-block mb-4">
          Testimonials
        </span>
        <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-[#0B2545] mb-12">
          What our students say
        </h2>

        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-12 h-12 bg-[#F2A93B] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>

          <img
            src={t.image}
            alt={t.name}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-lg mt-4"
          />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed italic mb-6 max-w-2xl mx-auto">
            "{t.message}"
          </p>
          <p className="font-sora font-bold text-[#0B2545] text-base">{t.name}</p>
          <p className="text-slate-400 text-sm">{t.place}</p>

          <button
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-all duration-300 border border-slate-100"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-all duration-300 border border-slate-100"
          >
            →
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#F2A93B]" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. FINAL CTA - Professional Design
function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#0B2545] font-inter relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <h2 className="font-sora font-extrabold text-white text-3xl md:text-5xl leading-tight mb-4">
          Ready to start your <span className="text-[#F2A93B]">next skill</span>?
        </h2>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Pick a course, join the next batch, and walk away with a Diploma that
          actually opens doors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] px-10 py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[#F2A93B]/30 group"
          >
            Browse Courses
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-sm transition-all duration-300 border border-white/20 backdrop-blur-sm"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN HOME PAGE ─────────────────────────────────────────────────────────

export default function Home() {
  const courses = useFetch("/api/courses", FALLBACK_COURSES);
  const placements = useFetch("/api/placements", FALLBACK_PLACEMENTS);
  const testimonials = useFetch("/api/testimonials", FALLBACK_TESTIMONIALS);
  const displayCourses = Array.isArray(courses) ? courses.slice(0, 8) : FALLBACK_COURSES;

  return (
    <main>
      <Hero courseCount={displayCourses.length} />
      <BatchTicker />
      <CoursesSection courses={displayCourses} />
      <StatsSection />
      <PlacedStudents placements={Array.isArray(placements) ? placements : FALLBACK_PLACEMENTS} />
      <TestimonialsSection
        testimonials={Array.isArray(testimonials) ? testimonials : FALLBACK_TESTIMONIALS}
      />
      <FinalCTA />
    </main>
  );
}