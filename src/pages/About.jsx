import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  Target,
  Eye,
  Users,
  GraduationCap,
  Leaf,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const About = () => {
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);
  const [courses, setCourses] = useState([]);
  const [coursesError, setCoursesError] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoadingCourses(true);

    fetch(`${API}/api/courses`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        setCourses(Array.isArray(data) ? data : []);
        setCoursesError(null);
      })
      .catch((e) => {
        if (!isMounted) return;
        setCoursesError(e?.message || "Failed to load courses");
        setCourses([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadingCourses(false);
      });

    return () => {
      isMounted = false;
    };
  }, [visitorId]);

  const previewCourses = Array.isArray(courses) ? courses.slice(0, 4) : [];

  return (
    <>
      {/* Hero Section */}

      <section
        className="relative h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white px-5">
          <h1 className="text-5xl font-bold mb-4">
            About Jawahar Global Foundation
          </h1>

          <div className="flex justify-center gap-2 text-lg">
            <Link to="/">Home</Link>

            <span>/</span>

            <span className="text-red-400">About Us</span>
          </div>
        </div>
      </section>

      {/* About */}

      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900"
                className="rounded-3xl shadow-xl"
                alt=""
              />
            </div>

            <div>
              <span className="uppercase text-red-600 font-semibold tracking-widest">
                Who We Are
              </span>

              <h2 className="text-4xl font-bold mt-4 mb-6">
                Education-led courses that create real-world change
              </h2>

              <p className="text-gray-600 leading-8 mb-5">
                Jawahar Global Foundation is a non-profit committed to building
                stronger communities through structured learning—transforming
                lives with education, health awareness, skills development, women
                empowerment, and community support.
              </p>

              <p className="text-gray-600 leading-8 mb-8">
                Our courses are designed for impact: clear modules, practical
                learning outcomes, and guidance that helps learners grow with
                dignity and confidence—contributing to sustainable development
                across India.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full"
                >
                  Explore Courses
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white hover:bg-red-50 border border-red-100 text-[#C62828] px-8 py-4 rounded-full"
                >
                  Contact Us
                  <ArrowRight size={20} />
                </Link>
              </div>

              {loadingCourses && (
                <p className="text-sm text-gray-500 mt-4">Loading course highlights...</p>
              )}
              {!loadingCourses && coursesError && (
                <p className="text-sm text-red-600 mt-4">{coursesError}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision */}

      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-red-600 uppercase font-semibold">
              Our Purpose
            </span>
            <h2 className="text-4xl font-bold mt-3">Mission & Vision</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <Target className="text-red-600 mb-6" size={55} />
              <h3 className="text-3xl font-bold mb-5">Our Mission</h3>
              <p className="text-gray-600 leading-8">
                To uplift underprivileged communities through education-led
                courses—connecting learners to knowledge, livelihood pathways,
                health awareness, and sustainable development—while encouraging
                volunteerism and social responsibility.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <Eye className="text-red-600 mb-6" size={55} />
              <h3 className="text-3xl font-bold mb-5">Our Vision</h3>
              <p className="text-gray-600 leading-8">
                A society where every learner has equal access to education,
                opportunities, and wellbeing—regardless of economic or social
                background—supported by practical learning programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses */}

      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <span className="uppercase text-red-600 font-semibold">
              Our Courses
            </span>
            <h2 className="text-4xl font-bold mt-3">Learning that builds confidence</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <div className="bg-red-50 rounded-3xl p-10 shadow-sm h-full">
                <div className="text-red-700 mb-6">
                  <BookOpen size={56} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Designed as modules</h3>
                <p className="text-gray-600 leading-8">
                  Each course is structured into modules with clear progress.
                  Learners can study, practice, and complete learning pathways
                  that support education and community wellbeing.
                </p>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full"
                >
                  View All Courses
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {previewCourses.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/courses/${c.slug}`}
                    className="group bg-white rounded-2xl border border-red-100 hover:border-red-200 hover:shadow-md transition overflow-hidden"
                  >
                    <div className="h-28 bg-gray-100 relative">
                      {c.coverImageUrl && (
                        <img
                          src={c.coverImageUrl}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-extrabold text-gray-900 text-sm line-clamp-2">
                        {c.title}
                      </h4>
                      {c.level && (
                        <p className="text-xs text-gray-500 mt-1">Level: {c.level}</p>
                      )}
                      {typeof c.durationHours === "number" && (
                        <p className="text-xs text-gray-500">Duration: {c.durationHours} hours</p>
                      )}
                    </div>
                  </Link>
                ))}

                {!loadingCourses && previewCourses.length === 0 && !coursesError && (
                  <div className="sm:col-span-2 text-gray-600">No course highlights available yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}

      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <span className="uppercase text-red-600 font-semibold">
              Core Values
            </span>
            <h2 className="text-4xl font-bold mt-3">Principles That Guide Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart size={45} />, title: "Compassion" },
              { icon: <Users size={45} />, title: "Community" },
              { icon: <GraduationCap size={45} />, title: "Education" },
              { icon: <Leaf size={45} />, title: "Sustainability" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 duration-300"
              >
                <div className="text-red-600 flex justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter */}

      <section className="py-20 bg-red-700 text-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { number: "15,000+", title: "Lives Impacted" },
              { number: "500+", title: "Volunteers" },
              { number: "120+", title: "Projects" },
              { number: "18+", title: "States Reached" },
            ].map((item, index) => (
              <div key={index}>
                <h2 className="text-5xl font-bold">{item.number}</h2>
                <p className="mt-4 text-xl">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

