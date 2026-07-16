import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/foundation_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, Menu, X, ChevronDown, Search, XCircle } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [programDropdown, setProgramDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const visitorId = useMemo(() => getOrCreateVisitorId(), []);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [coursesError, setCoursesError] = useState(null);

  // Fetch courses
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

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    setShowResults(false);
    setShowSearch(false);
    navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#C62828] text-white text-sm hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                +91 9876543210
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                info@jawaharglobalfoundation.org
              </div>
            </div>

            <div className="flex gap-4 text-lg">
              <FaFacebookF className="cursor-pointer hover:text-yellow-400 transition" />
              <FaInstagram className="cursor-pointer hover:text-yellow-400 transition" />
              <FaLinkedinIn className="cursor-pointer hover:text-yellow-400 transition" />
              <FaYoutube className="cursor-pointer hover:text-yellow-400 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-red-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Jawahar Global Foundation Logo"
                className="h-16 w-auto object-contain"
              />

              <div>
                <h1 className="font-bold text-xl text-[#C62828]">
                  Jawahar Global Foundation
                </h1>

                <p className="text-xs text-gray-500">
                  Together For A Better Tomorrow
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8 font-medium">
              <Link to="/" className="hover:text-[#C62828] transition">
                Home
              </Link>

              <Link to="/about" className="hover:text-[#C62828] transition">
                About Us
              </Link>

              {/* Courses */}
              <div
                className="relative"
                onMouseEnter={() => setProgramDropdown(true)}
                onMouseLeave={() => setProgramDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-[#C62828] transition">
                  Courses <ChevronDown size={16} />
                </button>

                {programDropdown && (
                  <div className="absolute top-full left-0 bg-white shadow-xl rounded-md w-72 py-2">
                    <Link
                      to="/courses"
                      className="block px-5 py-3 hover:bg-[#FFEBEE] hover:text-[#C62828] font-semibold"
                    >
                      All Courses
                    </Link>

                    <div className="h-px bg-red-100" />

                    {loadingCourses && (
                      <div className="px-5 py-3 text-sm text-gray-600">
                        Loading...
                      </div>
                    )}

                    {coursesError && !loadingCourses && (
                      <div className="px-5 py-3 text-sm text-red-600">
                        {coursesError}
                      </div>
                    )}

                    {!loadingCourses &&
                      !coursesError &&
                      courses.length === 0 && (
                        <div className="px-5 py-3 text-sm text-gray-600">
                          No courses found.
                        </div>
                      )}

                    {!loadingCourses &&
                      !coursesError &&
                      courses.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/courses/${c.slug}`}
                          className="block px-5 py-3 hover:bg-[#FFEBEE] hover:text-[#C62828] text-sm"
                        >
                          {c.title}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
{/* 
              <Link to="/blog" className="hover:text-[#C62828] transition">
                Blog
              </Link> */}

              <Link to="/gallery" className="hover:text-[#C62828] transition">
                Gallery
              </Link>

              <Link to="/contact" className="hover:text-[#C62828] transition">
                Contact
              </Link>
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Search */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-700 hover:text-[#C62828] transition"
              >
                <Search size={22} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Search Box with Results */}
        {showSearch && (
          <div className="absolute left-0 top-full w-full bg-white shadow-lg p-5 border-t border-gray-100">
            <div className="container mx-auto max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 pr-12 rounded-lg outline-none focus:border-[#C62828] transition"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={20} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#C62828] text-white p-2 rounded-lg hover:bg-[#8E0000] transition"
                >
                  <Search size={18} />
                </button>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No courses found for "{searchQuery}"
                    </div>
                  ) : (
                    <ul className="py-2">
                      {searchResults.map((course) => (
                        <li key={course.slug}>
                          <Link
                            to={`/courses/${course.slug}`}
                            onClick={() => {
                              setShowResults(false);
                              setShowSearch(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFEBEE] transition"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                              {course.coverImageUrl ? (
                                <img
                                  src={course.coverImageUrl}
                                  alt={course.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#C62828]/10 flex items-center justify-center text-[#C62828] text-xs font-bold">
                                  {course.title.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 text-sm">
                                {course.title}
                              </div>
                              {course.level && (
                                <div className="text-xs text-gray-500">
                                  {course.level}
                                </div>
                              )}
                            </div>
                            <span className="text-[#C62828] text-sm font-medium">
                              View →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t shadow-md">
            <div className="flex flex-col p-5 gap-4">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/courses">Courses</Link>
              {/* <Link to="/blog">Blog</Link> */}
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Contact</Link>

              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-lg outline-none focus:border-[#C62828]"
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
                      setMobileMenu(false);
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C62828]"
                >
                  <Search size={18} />
                </button>
              </div>

              {searchQuery && searchResults.length > 0 && (
                <div className="mt-2 border-t border-gray-100 pt-2">
                  {searchResults.slice(0, 3).map((course) => (
                    <Link
                      key={course.slug}
                      to={`/courses/${course.slug}`}
                      onClick={() => setMobileMenu(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-[#C62828]"
                    >
                      {course.title}
                    </Link>
                  ))}
                  {searchResults.length > 3 && (
                    <Link
                      to={`/courses?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setMobileMenu(false)}
                      className="block py-2 text-sm text-[#C62828] font-semibold"
                    >
                      View all {searchResults.length} results →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;